const PillCourseModel = require('../models/schemas/schemasDB').pills;
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
        try {
            let isvalidated = utils.validatefields(req.body);
            if(isvalidated.validated == false){
                return res.status(409).send({ error: isvalidated.message });
            }
            const { title, description, file, course_id } = req.body;
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
        try {
            const { idpill } = req.params;
            let isvalidated = utils.validatefields(req.body);
            if(isvalidated.validated == false){
                return res.status(409).send({ error: isvalidated.message });
            }
            const { title, description, file } = req.body;
            let filter = { _id: idpill };
            const Pill = await PillCourseModel.findOne(filter);
            if(!Pill){
                return res.status(404).send({error: 'Pill does not exist'});
            }  
            const updatePill = { 
                title: title,
                description: description,
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
        const { idPill } = req.params;
        try {
            let pilldelete = await PillCourseModel.findOneAndDelete({ _id: idPill });
            return res.status().send({error: 'se logro eliminar esta pildora con exito'});
        } catch (error) {
            return res.status().send({error: 'error inesperado'});
        }
    }
};

