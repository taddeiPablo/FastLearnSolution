var express = require('express');
var router = express.Router();
var requireAuth = require('../middleware/requireAuth');
var topicsCourseController = require('../controllers/topics_controller');

router.get('/get', requireAuth, topicsCourseController.getTopics);
router.post('/create', requireAuth, topicsCourseController.create);
router.put('/update/:id', requireAuth, topicsCourseController.update);
router.delete('/delete/:id', requireAuth, topicsCourseController.delete);

module.exports = router;