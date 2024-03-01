const bcrypt = require('bcrypt');
const UserModel = require('../models/schemas/schemasDB').user;
const jwt = require('jsonwebtoken');

module.exports = {
    registration: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { username, password, email, isStudent, isTeacher } = req.body;
        let user;
        if(username != "" && username != undefined && password != "" && password != undefined){
            user = await UserModel.findOne({ username: username});
            if(user){
                res.status(409).send({error: "This user already exists!!!"});
            }else{
                user = new UserModel(
                    {   
                        username: username, 
                        password: password, 
                        email: email,
                        isStudent: isStudent,
                        isTeacher: isTeacher,
                        active: true
                    }
                );
                await user.save();
                res.status(200).send({success: "the user registered successfully"});
            }
        }else{
            res.status(409).send({error: "some fields are required"});
        }
    },
    login: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try{
            const { username, password } = req.body;
            let user;
            if(username != "" && username != undefined && password != "" && password != undefined){
                user = await UserModel.findOne({username: username});
                if(!user){
                    return res.status(404).send({error: "Username does not exist"});
                }
                try {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err){
                            return res.status(500).send({error: "unexpected error"});
                        }
                        if(isMatch){
                            const token = jwt.sign({userId: user._id}, process.env.AUTH_KEY, { expiresIn: '1h'});
                            return res.status(200).send({success: token});
                        }else{
                            return res.status(403).send({error: "invalid password"});        
                        }
                    });
                } catch (error) {
                    return res.status(500).send({error: "unexpected error"});
                }
            }else{
                return res.status(401).send({error: "some fields are required"});
            }
        }catch(err){
            return res.status(403).send({error: err.message});
        }
    },
    Get: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let getUser = { 
                username: req.user.username, 
                email: req.user.email
            };
            return res.status(200).send({success: getUser});
        } catch (error) {
            return res.status(403).send({error: error.message});
        }
    },
    update: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { username, email, active } = req.body;
        const filter = { _id: req.user._id };
        const user = await UserModel.findOne(filter);
        if(!user){
            return res.status(404).send({error: 'User does not exist'});
        }
        try {
            if(user.username != username && username !="" && username != undefined)
                user.username = username;
            if(user.email != email && user.email !="" && user.email != undefined)
                user.email = email;
            if(user.active != active && active != undefined)
                user.active = active;
            await user.save();
            return res.status(200).send({success: 'User updated'});
        } catch (error) {
            return res.status(401).send({error: 'unexpected error'});
        }
    },
    updatePassword: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        const { password } = req.body;
        const filter = { _id: req.user._id };
        try {
            const user = await UserModel.findOne(filter);
            if(!user)
                return res.status(404).send({error: 'User does not exist'});
            if(password !="" && password != undefined){
                user.password = password;
            }else{
                return res.status(500).send({error: 'the update failed, the field cannot be empty'});
            }
            await user.save();
            return res.status(200).send({success: 'password update was successful'});            
        } catch (error) {
            return res.status(401).send({error: 'unexpected error'});
        }
    }
}