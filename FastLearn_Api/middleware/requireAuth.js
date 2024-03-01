const jwt = require('jsonwebtoken');
const User = require('../models/schemas/schemasDB').user;

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
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};