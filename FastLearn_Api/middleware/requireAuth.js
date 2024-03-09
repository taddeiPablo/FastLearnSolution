const jwt = require('jsonwebtoken');
const Teacher = require('../models/schemas/schemasDB').teacher;
const Student = require('../models/schemas/schemasDB').student;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).send({error:'error en la autenticacion'});
    }
    const token = authorization.split('bearer')[1].trim();
    jwt.verify(token, process.env.AUTH_KEY, async(err, payload) => {
        if(err){
            return res.status(404).send({error: 'el usuario no existe'});
        }
        const { typeUsr, userId } = payload;
        let user;
        if(typeUsr == "st"){
            user = await Student.findById(userId);
        }else if(typeUsr == "mrs"){
            user = await Teacher.findById(userId);
        }
        req.user = user;
        req.type_usr = typeUsr;
        next();
    });
};