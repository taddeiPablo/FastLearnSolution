//TODO : REVISAR PROBAR A FONDO LA VALIDACION DE ESTOS CAMPOS
module.exports = {
    validatefields: (obj) => {
        let result = { "validated": true, "message": "existen campos vacios : "};
        Object.keys(obj).forEach(function(key) {
            if(!obj[key] && key != "closed" && key != "finished" && key != "quantityPills")
            {
                result.validated = false;
                result.message += key;
            }
        });
        return result;
    },
    loadCategories: () => {
        let array_categories = [
            "Programacion",
            "Sistemas",
            "Inteligencia Artificial",
            "Ciencia y Tecnologia",
            "Blockchain y Cripto",
            "Ciberseguridad"
        ];
        return array_categories;
    },
    loadPaymentMethods: () => {
        let array_paymentMethod = [
            "Free",
            "Pay"
        ];
        return array_paymentMethod;
    },
    ValidateUpdateFields: (field) => {
        let result = "";
        if(field != "" && field != undefined){
            result = field;
        }
        return result;
    }
};