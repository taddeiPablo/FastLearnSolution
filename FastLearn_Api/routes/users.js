var express = require('express');
var router = express.Router();
var userController = require('../controllers/users_controller');
var requireAuth = require('../middleware/requireAuth');
var cors = require('cors')

/*var corsOptions = {
  origin: 'http://localhost:5173/',
  optionsSuccessStatus: 200
}*/

/* GET users listing. */
router.get('/status', function(req, res, next) {
  res.send('respond with a resource');
});
// obtengo el email del user logueado
router.get('/teacher', cors(), requireAuth, userController.GetTeacher);
router.get('/student', cors(), requireAuth, userController.GetStudent);
/*POST api users */
// me registro como user en la plataforma
router.post('/teacher/registration', cors(), userController.registrationTeacher);
router.post('/student/registration', cors(), userController.registrationStudent);
// me logueo en la plataforma
router.post('/teacher/login', cors(), userController.loginTeacher); 
router.post('/student/login', cors(), userController.loginStudent);
// actualizo los datos de los usuarios (teacher, student)
router.post('/teacher/update', cors(), requireAuth, userController.updateTeacher);
router.post('/student/update', cors(), requireAuth, userController.updateStudent);

module.exports = router;