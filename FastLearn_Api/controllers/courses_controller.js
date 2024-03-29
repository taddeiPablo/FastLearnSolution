const CourseModel = require('../models/schemas/schemasDB').course;
const CreatedCModel = require('../models/schemas/schemasDB').createdCourse;
const SubcribedCModel = require('../models/schemas/schemasDB').subcribeCourse;
const CommentModel = require('../models/schemas/schemasDB').comment;
const RatingModel = require('../models/schemas/schemasDB').rating;
const CommentsRatings = require('../models/schemas/schemasDB').commentAndRating;
const PillcourseModel = require('../models/schemas/schemasDB').pills;
const QuestionaryModel = require('../models/schemas/schemasDB').questionary;
const categoryModel = require('../models/schemas/schemasDB').category;
const paymentMethodModel = require('../models/schemas/schemasDB').paymentMethod;
const utils = require('../middleware/utils');

module.exports = {
    create: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let isvalidated = utils.validatefields(req.body);
            if(isvalidated.validated == false)
                return res.status(409).send({ error: isvalidated.message });
            const { title, description, created_date, image, categoryParam, paymentParam, price } = req.body;
            const ExistCourse = await CourseModel.findOne({title: title});
            if(ExistCourse)
                return res.status(409).send({error: 'el curso ya existe'});
            let categoryObj = await categoryModel.findOne({category: categoryParam });
            let paymentObj = await paymentMethodModel.findOne({payMethod: paymentParam});
            let newCourse = new CourseModel(
                {
                    title: title,
                    description: description,
                    created_date: created_date,
                    image: image,
                    id_category: categoryObj._id != undefined ? categoryObj._id : undefined,
                    id_payment: paymentObj._id != undefined ? paymentObj._id : undefined,
                    price: price == undefined ? 0 : price,
                    closed: false,
                    finished: false,
                    percentage: 0,
                    quantityPills: 0
                }
            );
            await newCourse.save().then((saveCourse) => {
                if(saveCourse === newCourse){
                    let createdCourse = new CreatedCModel(
                        {
                            teacher_id: req.user._id,
                            course_id: saveCourse._id
                        }
                    );
                    createdCourse.save();
                }
            });
            return res.status(200).send({success: 'el curso fue creado con exito'});        
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    update: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { courseId } = req.params;
            const { title, description, created_date, image, categoryParam, paymentParam, price } = req.body;
            const filter = {_id: courseId };
            const ExistCourse = await CourseModel.findOne(filter);
            if(!ExistCourse)
                return res.status(404).send({error: 'el curso no existe'});           
            const update = {};
            if(utils.ValidateUpdateFields(title) != ""){
                update.title = title;
            }
            if(utils.ValidateUpdateFields(description) != ""){
                update.description = description;
            }
            if(utils.ValidateUpdateFields(created_date) != ""){
                update.created_date = created_date;
            }
            if(utils.ValidateUpdateFields(image) != ""){
                update.image = image;
            }
            let categoryObj;
            if(utils.ValidateUpdateFields(categoryParam) != ""){
                categoryObj = await categoryModel.findOne({category: categoryParam});
                update.id_category = categoryObj._id != undefined ? categoryObj._id : undefined;
            }
            let paymentObj;
            if(utils.ValidateUpdateFields(paymentParam) != ""){
                paymentObj = await paymentMethodModel.findOne({payMethod: paymentParam});
                update.id_payment = paymentObj._id != undefined ? paymentObj._id : undefined;
            }
            update.price = price == undefined ? 0 : price;
            await CourseModel.findOneAndUpdate(filter, update);
            return res.status(200).send({success: 'el curso se actualizo con exito'});
        } catch (error) {
            return res.status(500).send({error: 'Hubo un error inesperado'});
        }
    },
    //todo: aqui cerramos un curso no se elimina luego se podria reabir nuevamente
    closed_course: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { course_id, closed } = req.body;
            const filter = { _id: course_id };
            const ExistCourse = await CourseModel.findOne(filter);
            if(!ExistCourse) {
                return res.status(404).send({error: 'el curso no existe'});
            }
            const update = {
                closed: closed
            }
            await CourseModel.findOneAndUpdate(filter, update);
            return res.status(200).send({success: 'el curso a sido cerrado con exito'});   
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    open_course: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try {
            const { course_id, closed } = req.body;
            const filter = {_id: course_id};
            const ExistCourse = await CourseModel.findOne(filter);
            if(!ExistCourse){
                return res.status(404).send({error: 'el curso no existe'});
            }
            const update = {
                closed: closed
            }
            await CourseModel.findOneAndUpdate(filter, update);
            return res.status(200).send({success: 'el curso a sido cerrado o abierto con exito'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    subcribeCourse: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { course_id } = req.body;
            const newSubcribe = new SubcribedCModel({
                student_id: req.user._id,
                course_id: course_id,
                approval: false,
                inProgress: true,
            });
            await newSubcribe.save();
            return res.status(200).send({success: 'subcripcion realizada con exito'});
        } catch (error) {
            return res.status(500).send({error: error.message});
        }
    },
    updatesubcribeCourse: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { idcourse } = req.body;
            const filter = { user_id: req.user._id, course_id: idcourse };
            const updateSubcribeCourse = await SubcribedCModel.findOne(filter);
            if(!updateSubcribeCourse){
                return res.status(404).send({error: 'no se encontro este registro'});
            }
            updateSubcribeCourse.approval = true;
            updateSubcribeCourse.inprogress = false;
            await SubcribedCModel.findOneAndUpdate(filter, updateSubcribeCourse);
            return res.status(200).send({success: 'la subcripcion fue realizada con exito'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    //todo : listado de cursos creados por un profesor
    getListCourseCreated: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const allcourseCreated = await CreatedCModel.find({teacher_id: req.user._id})
                                                        .populate('course_id').exec();
            const allCategories = await categoryModel.find({});
            const allPayments = await paymentMethodModel.find({});
            const results = [];
            allcourseCreated.forEach(item =>{
                const { _id, title, description, created_date, image, id_category, id_payment, price } = item.course_id;
                let categoryName = allCategories.find(cat => cat._id.toString() == id_category.toString()).category;
                let paymentName = allPayments.find(pay => pay._id.toString() == id_payment.toString()).payMethod;
                const jsonresult = {
                    "course_id": _id,
                    "Title": title,
                    "Description": description,
                    "Created_Date": created_date,
                    "Category": categoryName,
                    "Payment": paymentName,
                    "Image": image,
                    "Price": price
                }
                results.push(jsonresult);
            });
            return res.status(200).send({success: results});
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({error: 'error de mierda'});
        }
    },
    //todo : listado de cursos creados por un alumno
    getListCourseSubscribed: async (req, res, next) => { 
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const allsubcribeb_course = await SubcribedCModel.find({student_id: req.user_id})
                                                             .populate('course_id').exec();
            const allCategories = await categoryModel.find({});
            const allPayments = await paymentMethodModel.find({});
            const results = [];
            allsubcribeb_course.forEach(item => {
                const { _id, title, description, created_date, image, id_category, id_payment, price } = item.course_id;
                let categoryName = allCategories.find(cat => cat._id.toString() == id_category.toString()).category;
                let paymentName = allPayments.find(pay => pay._id.toString() == id_payment.toString()).payMethod;
                const jsonresult = {
                    "course_id": _id,
                    "Title": title,
                    "Description": description,
                    "Created_Date": created_date,
                    "Category": categoryName,
                    "Payment": paymentName,
                    "Image": image,
                    "Price": price
                }
                results.push(jsonresult);
            });
            return res.status(200).send({success: results});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    // aqui obtengo las pildoras de un curso determinado seas alumno o profesor
    getPills: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { courseId } = req.params;
            const filter = {'course_id': courseId};
            const existPills = await PillcourseModel.find(filter);
            if(!existPills){
                return res.status(404).send({error: 'no existen pildoras para este curso aun'});
            }
            return res.status(200).send({success: existPills});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    // aqui devuelvo un cuestionario si el curso lo tiene
    getQuestionary: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        try {
            const { courseId } = req.params;
            const filter = {'course_id': courseId};
            const existQuestion = await QuestionaryModel.findOne(filter);
            if(!existQuestion){
                return res.status(404).send({error: 'no existe un cuestionario aun'});
            }
            return res.status(200).send({success: existQuestion});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    getRatings_And_Comments: async(req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { courseId } = req.params;
            const filter = {'course_id': courseId}; //{'comment_id': '65ef1a5ff0e2531bfc82c35a'}; //{'course_id': courseId};
            //todo: faltaria completar la info ordenarla y tomar los theacher o students correspondientes
            const allcomments = await CommentsRatings.find(filter)
                                                    .populate('comment_id')
                                                    .populate('rating_id').exec();
            console.log(allcomments);
            return res.status(200).send({success: "info"});
        } catch (error) {
            return res.status(500).send({error: error.message});
        }
    },
    //todo: delete de cursos la eliminacion no es virtual sino real
    delete: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { courseId } = req.params;
        const filter = { _id: courseId };
        try {
            let courseDelete = await CourseModel.findOneAndDelete(filter); //deleteo el curso
            let filterCourse = { course_id: courseDelete._id };
            if(!courseDelete){
                // primero deleteamos las pildoras y los formularios de preguntas
                await PillcourseModel.delete(filterCourse);
                await QuestionaryModel.delete(filterCourse);
                // segundo deleteamos los comments and ratings
                let array = await CommentsRatings.find(filterCourse);


                /*await CreatedCModel.findOneAndDelete(filterCourse); // deleteo el created
                let pilldelete = await PillcourseModel.findOneAndDelete(filterCourse); // deleteo las pildoras
                if(!pilldelete)
                    await QuestionModel.delete({ pill_id: pilldelete._id }); // deleteo las preguntas
                // aqui cambiar POR LA NUEVA TABLA "comments_and_ratingsSchema"
                //await CommentModel.delete(filterCourse); // deleteo los comments
                //await RatingModel.delete(filterCourse); // deleteo los ratings
                await CommentsRatings.delete(filterCourse);*/
            }
            return res.status(200).send({success: 'curso eliminado con exito'});
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    addComment: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { courseId, comment } = req.body;
        try {
            let newComment = new CommentModel(
                {
                    comment: comment
                }
            );
            await newComment.save().then((saveComment) => {
                if(newComment === saveComment){
                    let commentsRatings = new CommentsRatings({
                        course_id: courseId,
                        comment_id: saveComment._id
                    });
                    if(req.type_usr == "st")
                        commentsRatings.student_id = req.user._id;
                    if(req.type_usr == "mrs")
                        commentsRatings.teacher_id = req.user._id;
                    commentsRatings.save();
                }
            });
            return res.status(200).send({success: 'el comentario se realizo con exito'});   
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    addRating: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { courseId, rating } = req.body;
        try {
            let newRating = new RatingModel({
                rating: rating
            });
            await newRating.save().then((saveRating) => {
                if(newRating === saveRating){
                    let commentsRatings = new CommentsRatings({
                        course_id: courseId,
                        rating_id: saveRating._id
                    });
                    if(req.type_usr == "st")
                        commentsRatings.student_id = req.user._id;
                    if(req.type_usr == "mrs")
                        commentsRatings.teacher_id = req.user._id;
                    commentsRatings.save();
                }
            });
            return res.status(200).send({success: 'rating subido con exito'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    }
};