var express = require('express');
var router = express.Router();
var userController = require('../controllers/users_controller');
var requireAuth = require('../middleware/requireAuth');

/* GET users listing. */
router.get('/status', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/', requireAuth, userController.Get); // obtengo el username y el email
/*POST api users */
router.post('/registration', userController.registration); //me registro
router.post('/login', userController.login); // devuelvo el token
router.post('/UpdateUser', requireAuth, userController.update); // aqui actualizamos los datos del usuario no el password
router.post('/updatePassword', requireAuth, userController.updatePassword); // aqui actualizamos el password

module.exports = router;