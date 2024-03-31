var express = require('express');
var router = express.Router();
var profilesController = require('../controllers/profiles_controller');
var requireAuth = require('../middleware/requireAuth');
var cors = require('cors');

router.post('/create', requireAuth, profilesController.create);//crear
router.post('/update', requireAuth, profilesController.update);//actualizar
router.get('/profile', cors(), requireAuth, profilesController.get);// devuelvo el profile completo

module.exports = router;