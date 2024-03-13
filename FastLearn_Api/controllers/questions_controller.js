
const QuestionaryModel = require('../models/schemas/schemasDB').questionary;

module.exports = {
    getQuestion: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { courseId } = req.params;
            const filter = {'course_id': courseId};
            const existQuestion = await QuestionaryModel.findOne(filter);
            if(!existQuestion){
                return res.status(409).send({error: 'no existe cuestionarios'});
            }
            return res.status(200).send({success: existQuestion});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    createQuestion: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { questionArray, approved, disapproved, course_id } = req.body;
            if(questionArray.length == 0){
                return res.status(409).send({error: 'neesita cargar por lo menos una pregunta'});
            }
            const NewQuestion = new QuestionaryModel(
                {
                    questionArray: questionArray,
                    approved: approved,
                    disapproved: disapproved,
                    course_id: course_id
                }
            )
            await NewQuestion.save();
            return res.status(200).send({success: 'el cuestionario fue creado con exito'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    updateQuestion: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { idQuestion } = req.params;
            const { questionArray, approved, disapproved } = req.body;
            const filter = {_id: idQuestion};
            let update = {};
            if(questionArray.length == 0){
                return res.status(409).send({error: 'neesita cargar por lo menos una pregunta'});
            }else{
                update.questionArray = questionArray;
            }
            update.approved = approved;
            update.disapproved = disapproved;
            await QuestionaryModel.findOneAndUpdate(filter, update);
        } catch (error) {   
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    deleteQuestion: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { idQuestion } = req.params;
            const filter = { _id: idQuestion };
            let question = await QuestionaryModel.findOneAndDelete(filter);
            return res.status(200).send({success: 'cuestionario eliminado con exito'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    }
};