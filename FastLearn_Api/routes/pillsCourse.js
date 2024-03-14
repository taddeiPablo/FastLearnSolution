var express = require('express');
var router = express.Router();
var requireAuth = require('../middleware/requireAuth');
var pillCourseController = require('../controllers/pillsCourse_controller');

router.get('/get', requireAuth, pillCourseController.getPills);
router.post('/create', requireAuth, pillCourseController.create);
router.put('/update/:id', requireAuth, pillCourseController.update);
router.delete('/delete/:id', requireAuth, pillCourseController.delete);

module.exports = router;