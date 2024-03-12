const mongoose = require('mongoose');
const db = require('../connections/connectionDB').DB;
const bcrypt = require('bcrypt');

var schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

// declaramos trigger para user_schema en este caso un pre para encriptar el password antes de 
// el envio a la base de datos.

// Schema Teacher
const teacherSchema = mongoose.Schema({
    email: String,
    password: String,
    active: Boolean
});
// aqui declaro el pre, aqui se realiza el proceso de encriptacion del password ingresado
teacherSchema.pre('save', function(next){
    const teacher = this;
    if(!teacher.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }
        bcrypt.hash(teacher.password, salt, (err, hash) => {
            if(err){
                return next(err);
            }
            teacher.password = hash;
            next();
        });
    });
});
// Schema Student
const studentSchema = mongoose.Schema({
    email: String,
    password: String,
    active: Boolean
});
// aqui declaro el pre, aqui se realiza el proceso de encriptacion del password ingresado
studentSchema.pre('save', function(next){
    const student = this;
    if(!student.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }
        bcrypt.hash(student.password, salt, (err, hash) => {
            if(err){
                return next(err);
            }
            student.password = hash;
            next();
        });
    });
});
// Schema Profile user
const profileSchema = mongoose.Schema({
    user_id: ObjectId,
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
    category: String
});
// pensar en utilizar un array de objects
const paymentMethodSchema = mongoose.Schema({
    idPayment: Number,
    payMethod: String
});
// Schema Course 
const CoursesSchema = mongoose.Schema({
    title: String,
    description: String,
    created_date: String,
    image: Buffer,
    id_category: {
        type: ObjectId,
        ref: 'categories'
    },
    id_payment: {
        type: ObjectId,
        ref: 'payment'
    },
    price: Number,
    closed: Boolean,
    percentage: Number,
    quantityPills: Number
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
    course_id: {
        type: ObjectId,
        ref: 'courses'
    }
});
// isSteacher - si el usuario es profesor
const created_coursesSchema = mongoose.Schema({
    teacher_id: {
        type: ObjectId,
        ref: 'teachers'
    },
    course_id: {
        type: ObjectId,
        ref: 'courses'
    }
});
// isStudent - si el usuario es estudiante
const subcribe_coursesSchema = mongoose.Schema({
    student_id: {
        type: ObjectId,
        ref: 'students'
    },
    course_id: {
        type: ObjectId,
        ref: 'courses'
    },
    approval: Boolean,
    inProgress: Boolean
});
// aqui coleccion para unir los comentarios y ratings a los estudiantes o profesores con los cursos
const comments_and_ratingsSchema = mongoose.Schema({
    teacher_id: {
        type: ObjectId,
        ref: 'teachers'
    },
    student_id: {
        type: ObjectId,
        ref: 'students'
    },
    course_id: {
        type: ObjectId,
        ref: 'courses'
    },
    comment_id: {
        type: ObjectId,
        ref: 'comments'
    },
    rating_id: {
        type: ObjectId,
        ref: 'ratings'
    }
});
// guardado de comentarios de alumnos
const CommentsSchema = mongoose.Schema({
    comment: String
    /*user_id: {
        type: ObjectId,
        ref: 'users'
    },
    course_id: {
        type: ObjectId,
        ref: 'courses'
    }*/
});
// guardado de ratings puntuacion del cursos dada por los alumnos
const RatingsSchema = mongoose.Schema({
    rating: Number/*,
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    course_id:{
        type: ObjectId,
        ref: 'courses'
    }*/
});

// models for schema
//const userModel = db.model('users', userSchema);
const teacherModel = db.model('teachers', teacherSchema);
const studentModel = db.model('students', studentSchema);
const profileModel = db.model('profiles', profileSchema);
const coursesModel = db.model('courses', CoursesSchema);
const pillsModel = db.model('pills', PillsSchema);
const questionariesModel = db.model('questions', QuestionarySchema);
const created_coursesModel = db.model('createdCourse', created_coursesSchema);
const subcribe_coursesModel = db.model('assignedCourse', subcribe_coursesSchema);
const commentAndRatingsModel = db.model('comment_and_ratings', comments_and_ratingsSchema);
const commentModel = db.model('comment', CommentsSchema);
const ratingModel = db.model('rating', RatingsSchema);
const categoriesModel = db.model('categories', categoriesSchema);
const paymenMethodModel = db.model('payment', paymentMethodSchema);

// devolvemos la entidad creada
module.exports = {
    teacher: teacherModel,
    student: studentModel,
    profile: profileModel,
    category: categoriesModel,
    course: coursesModel,
    pills: pillsModel,
    questionary: questionariesModel,
    createdCourse: created_coursesModel,
    subcribeCourse: subcribe_coursesModel,
    comment: commentModel,
    rating: ratingModel,
    commentAndRating: commentAndRatingsModel,
    paymentMethod: paymenMethodModel
};