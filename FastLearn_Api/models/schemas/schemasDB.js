const mongoose = require('mongoose');
const db = require('../connections/connectionDB').DB;
const bcrypt = require('bcrypt');

var schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

// declaramos trigger para user_schema en este caso un pre para encriptar el password antes de 
// el envio a la base de datos.

// Schema users
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    isStudent: String,
    isTeacher: String,
    active: Boolean
});
// aqui declaro el pre, aqui se realiza el proceso de encriptacion del password ingresado
userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
// Schema Profile user
const profileSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
		ref: 'users'
    },
    name: String,
    lastname: String,
    profession: String,
    bio: String,
    image: Buffer,
    url_page: String,
    url_blog: String,
    url_linkedin: String,
    url_twitter: String
});
// Schema categorias (armar las categorias necesarias)
const categoriesSchema = mongoose.Schema({
    idCategory: Number,
    value: String
});
// Schema Course 
const CoursesSchema = mongoose.Schema({
    title: String,
    description: String,
    created_date: String,
    image: Buffer,
    id_category: Number,
    price: Number,
    closed: Boolean
});
// Schema - pildora para los cursos
const PillsSchema = mongoose.Schema({
    title: String,
    description: String,
    file: Buffer,
    course_id : {
        type: ObjectId,
        ref: 'courses'
    }
});

// Schema Question - preguntas que pueden tener las pildoras
const QuestionarySchema = mongoose.Schema({
    questionArray: [{
        Key: Number, 
        question: String,
        options: [{key: String, value: String}],
        correct_opt: String,
    }],
    approved: Boolean,
    disapproved: Boolean,
    pill_id: {
        type: ObjectId,
        ref: 'courses'
    }
});
// isSteacher - si el usuario es profesor
const created_coursesSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    course_id: {
        type: ObjectId,
        ref: 'courses'
    }
});
// isStudent - si el usuario es estudiante
const subcribe_coursesSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    course_id: {
        type: ObjectId,
        ref: 'courses'
    }
});
// guardado de comentarios de alumnos
const CommentsSchema = mongoose.Schema({
    comment: String,
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    course_id: {
        type: ObjectId,
        ref: 'courses'
    }
});
// guardado de ratings puntuacion del cursos dada por los alumnos
const RatingsSchema = mongoose.Schema({
    rating: Number,
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    course_id:{
        type: ObjectId,
        ref: 'courses'
    }
});

// models for schema
const userModel = db.model('users', userSchema);
const profileModel = db.model('profiles', profileSchema);
const coursesModel = db.model('courses', CoursesSchema);
const pillsModel = db.model('pills', PillsSchema);
const questionariesModel = db.model('questions', QuestionarySchema);
const created_coursesModel = db.model('createdCourse', created_coursesSchema);
const subcribe_coursesModel = db.model('assignedCourse', subcribe_coursesSchema);
const commentModel = db.model('comment', CommentsSchema);
const ratingModel = db.model('rating', RatingsSchema);
const categoriesModel = db.model('categories', categoriesSchema);

// devolvemos la entidad creada
module.exports = {
    category: categoriesModel,
    user: userModel,
    profile: profileModel,
    course: coursesModel,
    pills: pillsModel,
    questionary: questionariesModel,
    createdCourse: created_coursesModel,
    subcribeCourse: subcribe_coursesModel,
    comment: commentModel,
    rating: ratingModel
};