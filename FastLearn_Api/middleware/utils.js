//TODO : REVISAR PROBAR A FONDO LA VALIDACION DE ESTOS CAMPOS
module.exports = {
    validatefields: (obj) => {
        let result = { "validated": true, "message": "existen campos vacios : "};
        Object.keys(obj).forEach(function(key) {
            if(!obj[key])
            {
                result.validated = false;
                result.message += key;
            }
        });
        return result;
    }
};