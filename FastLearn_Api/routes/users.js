var express = require('express');
var router = express.Router();
var userController = require('../controllers/users_controller');
var requireAuth = require('../middleware/requireAuth');

/* GET users listing. */
router.get('/status', function(req, res, next) {
  res.send('respond with a resource');
});
// obtengo el email del user logueado
router.get('/teacher/', requireAuth, userController.GetTeacher);
router.get('/student/', requireAuth, userController.GetStudent);
/*POST api users */
// me registro como user en la plataforma
router.post('/teacher/registration', userController.registrationTeacher);
router.post('/student/registration', userController.registrationStudent);
// me logueo en la plataforma
router.post('/teacher/login', userController.loginTeacher); 
router.post('/student/login', userController.loginStudent);

router.post('/teacher/update', requireAuth, userController.updateTeacher); // aqui actualizamos los datos del usuario no el password
router.post('/student/update', requireAuth, userController.updatePassword); // aqui actualizamos el password

module.exports = router;