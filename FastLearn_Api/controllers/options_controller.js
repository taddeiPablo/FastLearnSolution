const categoryModel = require('../models/schemas/schemasDB').category;
const paymentMethodModel = require('../models/schemas/schemasDB').paymethod;
//const utils = require('../middleware/utils');

module.exports = {
    getCategories: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let categories = await categoryModel.find({});
            if(!categories){
                return res.status(404).send({error: 'aun no existen categorias cargadas'});
            }
            return res.status(200).send({success: categories});
        } catch (error) {
            return res.status(500).send({error: ''});
        }
    },
    getPaymentMethod: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let paymethods = await paymentMethodModel.find({});
            if(!paymethods){
                return res.status(404).send({error: ''});
            }
            return res.status(200).send({success: paymethods});
        } catch (error) {
            return res.status(500).send({error: ''});
        }
    }
};
