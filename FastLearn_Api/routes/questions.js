var express = require('express');
var router = express.Router();
var QuestionController = require('../controllers/questions_controller');
var requireAuth = require('../middleware/requireAuth');

router.get('/', requireAuth, QuestionController.getQuestion);
router.post('/create', requireAuth, QuestionController.createQuestion);
router.put('/update/:questionId', requireAuth, QuestionController.updateQuestion);
router.delete('/delete/:questionId', requireAuth, QuestionController.deleteQuestion);

module.exports = router;