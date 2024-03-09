const CourseModel = require('../models/schemas/schemasDB').course;
const CreatedCModel = require('../models/schemas/schemasDB').createdCourse;
const SubcribedCModel = require('../models/schemas/schemasDB').subcribeCourse;
const CommentModel = require('../models/schemas/schemasDB').comment;
const RatingModel = require('../models/schemas/schemasDB').rating;
const CommentsRatings = require('../models/schemas/schemasDB').commentAndRating;
const PillcourseModel = require('../models/schemas/schemasDB').pills;
const QuestionModel = require('../models/schemas/schemasDB').questionary;
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
            console.log(error.message);
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    update: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            //TODO: REALIZAR UNAS ACTUALIZACIONES DE CURSOS
            /*let isvalidated = utils.validatefields(req.body);
            if(isvalidated.validated == false)
                return res.status(409).send({ error: isvalidated.message });*/
            const { courseId } = req.params;
            const { title, description, created_date, image, categoryParam, paymentParam, price } = req.body;
            const filter = {_id: courseId };
            const ExistCourse = await CourseModel.findOne(filter);
            if(!ExistCourse)
                return res.status(404).send({error: 'el curso no existe'});           
            const update = {};
            if(utils.ValidateUpdateFields(title) != "")
                update.title = title;
            if(utils.ValidateUpdateFields(description) != "")
                update.description = description;
            if(utils.ValidateUpdateFields(created_date) != "")
                update.created_date = created_date;
            if(utils.ValidateUpdateFields(image) != "")
                update.image = image;
            let categoryObj;
            if(utils.ValidateUpdateFields(categoryParam) != "")
                categoryObj = await categoryModel.findOne({category: categoryParam});
                update.id_category = categoryObj._id != undefined ? categoryObj._id : undefined;
            let paymentObj;
            if(utils.ValidateUpdateFields(paymentParam) != "")
                paymentObj = await paymentMethodModel.findOne({payMethod: paymentParam});
                update.id_payment = paymentObj._id != undefined ? paymentObj._id : undefined;
            update.price = price == undefined ? 0 : price;
            
            /*const update = {
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
            };*/
            await CourseModel.findOneAndUpdate(filter, update);
            return res.status(200).send({success: 'el curso se actualizo con exito'});
        } catch (error) {
            return res.status(500).send({error: ''});
        }
    },
    closed_course: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { id, closed } = req.body;
        const filter = { _id: id };
        const ExistCourse = await CourseModel.findOne(filter);
        if(!ExistCourse) {
            return res.status(404).send({error: 'el curso no existe'});
        }
        const update = {
            closed: closed
        }
        await CourseModel.findOneAndUpdate(filter, update);
        return res.status(200).send({success: 'el curso a sido cerrado o abierto con exito'});
    },
    subcribeCourse: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { idcourse } = req.body;
            const newSubcribe = new SubcribedCModel({
                user_id: req.user._id,
                course_id: idcourse,
                approval: false,
                inprogress: true,
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
    getListCourseCreated: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const allcourseCreated = await CreatedCModel.find({user_id: req.user._id}).populate('course_id').exec();
            const results = [];
            allcourseCreated.forEach(item =>{
                const { title, course_topic, description, image } = item.course_id;
                const jsonresult = {
                    "Title": title,
                    "CourseTopic": course_topic,
                    "Description": description,
                    "Image": image
                }
                results.push(jsonresult);
            });
            return res.status(200).send({success: results});
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({error: 'error de mierda'});
        }
    },
    getListCourseSubscribed: async (req, res, next) => { 
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const allsubcribeb_course = await SubcribedCModel.find({user_id: req.user_id}).populate('course_id').exec();
            const results = [];
            allsubcribeb_course.forEach(item => {
                const { title, course_topic, description, image } = item.course_id;
                const jsonresult = {
                    "Title": title,
                    "CourseTopic": course_topic,
                    "Description": description,
                    "Image": image
                }
                results.push(jsonresult);
            });
            return res.status(200).send({success: results});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }

    },
    delete: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { courseId } = req.params;
        //const { id } = req.body; //aqui recibimos el id del curso
        const filter = { _id: courseId };
        try {
            let courseDelete = await CourseModel.findOneAndDelete(filter); //deleteo el curso
            let filterCourse = { course_id: courseDelete._id };
            if(!courseDelete){
                await CreatedCModel.findOneAndDelete(filterCourse); // deleteo el created
                let pilldelete = await PillcourseModel.findOneAndDelete(filterCourse); // deleteo las pildoras
                if(!pilldelete)
                    await QuestionModel.delete({ pill_id: pilldelete._id }); // deleteo las preguntas
                // aqui cambiar POR LA NUEVA TABLA "comments_and_ratingsSchema"
                await CommentModel.delete(filterCourse); // deleteo los comments
                await RatingModel.delete(filterCourse); // deleteo los ratings
            }
            return res.status(200).send({success: 'curso eliminado con exito'});
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    addComment: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { idcourse, comment } = req.body;
        try {
            let newcomment = new CommentModel(
                {
                    course_id: idcourse,
                    comment: comment,
                    user_id: req.user._id
                }
            );
            newcomment.save();
            return res.status(200).send({success: 'el comentario se realizo con exito'});   
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    addRating: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { idcourse, rating } = req.body;
        try {
            let newrating = new RatingModel({
                course_id: idcourse,
                rating: rating,
                user_id: req.user._id
            });
            newrating.save();
            return res.status(200).send({success: 'rating subido con exito'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    }
};