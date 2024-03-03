const categoryModel = require('../models/schemas/schemasDB').category;
const paymentMethodModel = require('../models/schemas/schemasDB').paymethod;

module.exports = {
    getCategories: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let categories = await categoryModel.find({});
            if(categories.length == 0){
                // aqui cargar las categorias por primera vez solo una unica vez
                console.log("categorias la primera vez");
                console.log(categories.length);
            }
            if(!categories){
                return res.status(404).send({error: ''});
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
