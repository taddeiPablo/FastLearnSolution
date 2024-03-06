const categoryModel = require('../models/schemas/schemasDB').category;
const paymentMethodModel = require('../models/schemas/schemasDB').paymentMethod;
const utils = require('../middleware/utils');

module.exports = {
    getCategories: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let categories = await categoryModel.find({});
            if(categories.length == 0){
                console.log("no existen todavia las categorias");
                // aqui cargo las categorias que todavia no fueron cargadas en el sistema por primera vez
                let categoriesArray = utils.loadCategories();
                categoriesArray.forEach((categoryStr) => {
                    categoryModel.create({category: categoryStr});
                });
                categories = await categoryModel.find({});
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
            if(paymethods.length == 0){
                console.log("no existen los payments todavia");
                // aqui cargo las formas de pago disponibles que todavia no fueron cargadas en el sistema por primera vez
                let paymentMethodsArray = utils.loadPaymentMethods();
                paymentMethodsArray.forEach((paymethodStr) => {
                    paymentMethodModel.create({payMethod: paymethodStr});
                });
                paymethods = await paymentMethodModel.find({});
            }
            return res.status(200).send({success: paymethods});
        } catch (error) {
            return res.status(500).send({error: ''});
        }
    }
};
