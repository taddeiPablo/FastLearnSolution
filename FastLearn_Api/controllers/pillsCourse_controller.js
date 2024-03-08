const PillCourseModel = require('../models/schemas/schemasDB').pills;
//const QuestionModel = require('../models/schemas/schemasDB').questionary;
const utils = require('../middleware/utils');

module.exports = {
    getPills: async (req, res, next ) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { idpill } = res.params;
            let pills = await PillCourseModel.find({ _id: idpill });
            if(!pills){
                return res.status(404).send({error: 'Topics no encontrados'});
            }
            return res.status(200).send({success: pills});
        } catch (error) {
            
        }
    },
    create: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { title, description, file, course_id } = req.body;
        try {
            let isvalidated = utils.validatefields(req.body);
            if(isvalidated.validated == false){
                return res.status(409).send({ error: isvalidated.message });
            }
            //TODO: pensar como enviar el video en formato de bits talvez
            let newPill = new PillCourseModel(
                {
                    title: title,
                    description: description,
                    file: file,
                    course_id: course_id
                }
            );
            newPill.save();
            return res.status(200).send({success: 'pildora creada con exito'});   
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    update: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { idpill, file } = req.body;
        let filter = { _id: idpill };
        const Pill = await PillCourseModel.findOne(filter);
        if(!Pill){
            return res.status(404).send({error: 'Pill does not exist'});
        }
        try {
            const updatePill = { 
                file: file
            }   
            await PillCourseModel.findOneAndUpdate(filter, updatePill);
            return res.status(200).send({success: 'se actualizo la pildora correctaemnte'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    delete: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { id } = req.body;
        try {
            let pilldelete = await PillCourseModel.findOneAndDelete({ _id: id });
            //await QuestionModel.delete({ _id: pilldelete._id});
            return res.status().send({error: 'se logro eliminar esta pildora con exito'});
        } catch (error) {
            return res.status().send({error: 'error inesperado'});
        }
    }/*,
    createQuestions: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { question, options, optcorrect, pill_id } = req.body;
        console.log(question, options, optcorrect, pill_id);
        try {
            let newQuestion = new QuestionModel(
                {
                    question: question,
                    options: options,
                    optcorrect: optcorrect,
                    pill_id: pill_id
                }
            );
            newQuestion.save();
            return res.status(200).send({success: 'el cuestionario fue guardado con exito'});
        } catch (error) {
            return res.status(500).sned({error: 'error inesperado'});
        }
    },
    updateQuestions: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { id } = req.body;
        
    }*/
};

