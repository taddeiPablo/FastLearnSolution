const bcrypt = require('bcrypt');
const TeacherModel = require('../models/schemas/schemasDB').teacher;
const StudentModel = require('../models/schemas/schemasDB').student;
const jwt = require('jsonwebtoken');

module.exports = {
    registrationTeacher: async (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        try {
            const { email, password } = req.body;
            let teacher;
            if(email != "" && email != undefined && password != "" && password != undefined){
                teacher = await TeacherModel.findOne({ email: email});
                if(teacher){
                    res.status(409).send({error: "This Teacher already exists!!!"});
                }else{
                    teacher = new TeacherModel(
                        {
                            email: email,
                            password: password,
                            active: true
                        }
                    );
                    await teacher.save();
                    res.status(200).send({success: "the Teacher registered successfully"});
                }
            }else{
                res.status(409).send({error: "some fields are required"});
            }   
        } catch (error) {
            return res.status(403).send({error: err.message}); 
        }
    },
    registrationStudent: async (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        try {
            const { email, password } = req.body;
            let student;
            if(email != "" && email != undefined && password != "" && password != undefined){
                student = await StudentModel.findOne({ email: email});
                if(student){
                    res.status(409).send({error: "This Student already exists!!!"});
                }else{
                    student = new StudentModel(
                        {
                            email: email,
                            password: password,
                            active: true
                        }
                    );
                    await student.save();
                    res.status(200).send({success: "the Student registered successfully"});
                }
            }else{
                res.status(409).send({error: "some fields are required"});
            }   
        } catch (error) {
            return res.status(403).send({error: err.message});
        }
    },
    loginTeacher: async (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        try{
            const { email, password } = req.body;
            let teacher;
            if(email != "" && email != undefined && password != "" && password != undefined){
                teacher = await TeacherModel.findOne({email: email});
                if(!teacher){
                    return res.status(404).send({error: "email does not exist"});
                }
                bcrypt.compare(password, teacher.password, (err, isMatch) => {
                    if(err){
                        return res.status(500).send({error: "unexpected error"});
                    }
                    if(isMatch){
                        const token = jwt.sign({typeUsr: "mrs", userId: teacher._id}, process.env.AUTH_KEY, { expiresIn: '1h'});
                        return res.status(200).send({success: token});
                    }else{
                        return res.status(403).send({error: "invalid password"});        
                    }
                });
            }else{
                return res.status(401).send({error: "some fields are required"});
            }
        }catch(err){
            return res.status(403).send({error: err.message});
        }
    },
    loginStudent: async (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        try {
            const { email, password } = req.body;
            console.log(email + password);
            let student;
            if(email != "" && email != undefined && password != "" && password != undefined){
                student = await StudentModel.findOne({email: email});
                if(!student){
                    return res.status(404).send({error: "email does not exist"});
                }
                bcrypt.compare(password, student.password, (err, isMatch) => {
                    if(err){
                        return res.status(500).send({error: "unexpected error"});
                    }
                    if(isMatch){
                        const token = jwt.sign({typeUsr: "st", userId: student._id}, process.env.AUTH_KEY, { expiresIn: '1h'});
                        return res.status(200).send({success: token});
                    }else{
                        return res.status(403).send({error: "invalid password"});        
                    }
                });
            }else{
                return res.status(401).send({error: "some fields are required"}); 
            }
        } catch (error) {
            return res.status(403).send({error: error.message});
        }
    },
    GetTeacher: async (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        try {
            let teacher = { 
                email: req.user.email
            };
            return res.status(200).send({success: teacher});
        } catch (error) {
            return res.status(403).send({error: error.message});
        }
    },
    GetStudent: async (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        try {
            let student = { 
                email: req.user.email
            };
            return res.status(200).send({success: student });
        } catch (error) {
            return res.status(403).send({error: error.message});
        }
    },
    updateTeacher: async (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        const { email, password, active } = req.body;
        const filter = { _id: req.user._id };
        const teacher = await TeacherModel.findOne(filter);
        if(!teacher){
            return res.status(404).send({error: 'Teacher does not exist'});
        }
        try {
            if(teacher.email != email && email !="" && email != undefined)
                teacher.email = email;
            if(teacher.active != active && active != undefined)
                teacher.active = active;
            if(password !="" && password != undefined){
                teacher.password = password;
            }else{
                return res.status(500).send({error: 'the update failed, the field cannot be empty'});
            }
            await teacher.save();
            return res.status(200).send({success: 'Teacher updated'});
        } catch (error) {
            return res.status(401).send({error: `unexpected error: ${error.message}`});
        }
    },
    updateStudent: async (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        const { email, password, active } = req.body;
        const filter = { _id: req.user._id };
        const student = await StudentModel.findOne(filter);
        if(!student){
            return res.status(404).send({error: 'Student does not exist'});
        }
        try {
            if(student.email != email && email !="" && email != undefined)
                student.email = email;
            if(student.active != active && active != undefined)
                student.active = active;
            if(password !="" && password != undefined){
                student.password = password;
            }else{
                return res.status(500).send({error: 'the update failed, the field cannot be empty'});
            }
            await student.save();
            return res.status(200).send({success: 'Student updated'});
        } catch (error) {
            return res.status(401).send({error: `unexpected error : ${error.message}`});
        }
    }
}