const TopicsCourseModel  = require('../models/schemas/schemasDB').topics;
const utils = require('../middleware/utils');

module.exports = {
    getTopics: async(req, res, next ) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            const { idtopic } = res.params;
            let topics = await TopicsCourseModel.find({_id: idtopic});
            if(!topics){
                return res.status(404).send({error: 'Topics no encontrados'});
            }
            return res.status(200).send({success: topics});
        } catch (error) {
            
        }
    },
    create: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { title, description, course_id } = req.body;
        try {
            let newTopic = new TopicsCourseModel(
                {
                    title: title,
                    description: description,
                    course_id: course_id
                }
            );
            newTopic.save();
            return res.status(200).send({success: 'topic creada con exito'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    update: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const { idtopic, title, description } = req.body;
        try {
            let filter = { _id: idtopic };
            const topic = await TopicsCourseModel.findOne(filter);
            if(!topic)
                return res.status(404).send({error: 'Topic does not exist'});
            const updateTopic = { 
                title: title,
                description: description,
                file: file
            }   
            await TopicsCourseModel.findOneAndUpdate(filter, updateTopic);
            return res.status(200).send({success: 'se actualizo el topic correctaemnte'});
        } catch (error) {
            return res.status(500).send({error: 'error inesperado'});
        }
    },
    delete: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { idtopic } = req.body;
        try {
            let topicDelete = await TopicsCourseModel.findOneAndDelete({ _id: id });
            //await QuestionModel.delete({ _id: pilldelete._id});
            return res.status().send({error: 'se logro eliminar este topic con exito'});
        } catch (error) {
            return res.status().send({error: 'error inesperado'});
        }
    }
};