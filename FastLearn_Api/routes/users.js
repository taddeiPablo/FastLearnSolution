var express = require('express');
var router = express.Router();
var userController = require('../controllers/users_controller');
var requireAuth = require('../middleware/requireAuth');

/* GET users listing. */
router.get('/status', function(req, res, next) {
  res.send('respond with a resource');
});
// obtengo el email del user logueado
router.get('/teacher', requireAuth, userController.GetTeacher);
router.get('/student', requireAuth, userController.GetStudent);
/*POST api users */
// me registro como user en la plataforma
router.post('/teacher/registration', userController.registrationTeacher);
router.post('/student/registration', userController.registrationStudent);
// me logueo en la plataforma
router.post('/teacher/login', userController.loginTeacher); 
router.post('/student/login', userController.loginStudent);
// actualizo los datos de los usuarios (teacher, student)
router.post('/teacher/update', requireAuth, userController.updateTeacher);
router.post('/student/update', requireAuth, userController.updateStudent);
module.exports = router;