const CourseModel = require('../models/schemas/schemasDB').course;
const CreatedCModel = require('../models/schemas/schemasDB').createdCourse;
const SubcribedCModel = require('../models/schemas/schemasDB').subcribeCourse;
const CommentModel = require('../models/schemas/schemasDB').comment;
const RatingModel = require('../models/schemas/schemasDB').rating;
const PillcourseModel = require('../models/schemas/schemasDB').pills;
const QuestionModel = require('../models/schemas/schemasDB').questionary;
const utils = require('../middleware/utils');

module.exports = {
    create: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let isvalidated = utils.validatefields(req.body);
            if(isvalidated.validated == false)
                return res.status(409).send({ error: isvalidated.message });
            const { title, description, created_date, image, categoryId, pmId, price } = req.body;
            const ExistCourse = await CourseModel.findOne({title: title});
            if(ExistCourse)
                return res.status(409).send({error: 'el curso ya existe'});
            let newCourse = new CourseModel(
                {
                    title: title,
                    description: description,
                    created_date: created_date,
                    image: image,
                    category_key: categoryId,
                    payment_key: pmId,
                    price: price == undefined ? 0 : price,
                    closed: false
                }
            );
            await newCourse.save().then((saveCourse) => {
                if(saveCourse === newCourse){
                    let createdCourse = new CreatedCModel(
                        {
                            user_id: req.user._id,
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
            let isvalidated = utils.validatefields(req.body);
            if(isvalidated.validated == false)
                return res.status(409).send({ error: isvalidated.message });
            const { id, title, description, created_date, image, categorykey, pmkey, price } = req.body;
            const filter = {_id: id};
            const ExistCourse = await CourseModel.findOne(filter);
            if(!ExistCourse)
                return res.status(404).send({error: 'el curso no existe'});
            const update = {
                title: title,
                course_topic: course_topic,
                description: description,
                created_date: created_date,
                image: image,
                category_key: categorykey,
                payment_key: pmkey,
                price: price
            };
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
        const { id } = req.body; //aqui recibimos el id del curso
        const filter = { _id: id };
        try {
            let courseDelete = await CourseModel.findOneAndDelete(filter); //deleteo el curso
            let filterCourse = { course_id: courseDelete._id };
            if(!courseDelete){
                await CreatedCModel.findOneAndDelete(filterCourse); // deleteo el created
                let pilldelete = await PillcourseModel.findOneAndDelete(filterCourse); // deleteo las pildoras
                if(!pilldelete)
                    await QuestionModel.delete({ pill_id: pilldelete._id }); // deleteo las preguntas
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