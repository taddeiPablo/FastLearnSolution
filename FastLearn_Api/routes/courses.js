var express = require('express');
var router = express.Router();
var CourseController = require('../controllers/courses_controller');
var requireAuth = require('../middleware/requireAuth');
const courses_controller = require('../controllers/courses_controller');

router.get('/getListCourseCreated', requireAuth, CourseController.getListCourseCreated);
router.post('/create', requireAuth, CourseController.create);
router.put('/update/:courseId', requireAuth, CourseController.update);
router.delete('/delete/:courseId', requireAuth, CourseController.delete);
router.post('/closedCourse', requireAuth, CourseController.closed_course);
router.post('/openCourse', requireAuth, courses_controller.open_course);
router.post('/subcribeCourse', requireAuth, CourseController.subcribeCourse);
router.post('/addcomments', requireAuth, courses_controller.addComment);
router.post('/addratings', requireAuth, courses_controller.addRating);
router.get('/getListSubscribedCourse', requireAuth, CourseController.getListCourseSubscribed);
router.get('/getPills/:courseId', requireAuth, CourseController.getPills);
router.get('/getQuestionary/:courseId', requireAuth, courses_controller.getQuestionary);
router.get('/getRatingsComments/:courseId', requireAuth, courses_controller.getRatings_And_Comments);

module.exports = router;