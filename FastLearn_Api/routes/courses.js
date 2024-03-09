var express = require('express');
var router = express.Router();
var CourseController = require('../controllers/courses_controller');
var requireAuth = require('../middleware/requireAuth');
const courses_controller = require('../controllers/courses_controller');

router.post('/create', requireAuth, CourseController.create);
router.put('/update/:courseId', requireAuth, CourseController.update);
router.delete('/delete/:courseId', requireAuth, CourseController.delete);
router.post('/subcribeCourse', requireAuth, CourseController.subcribeCourse);
router.post('/closedCourse', requireAuth, CourseController.closed_course);
router.get('/getListCourseCreated', requireAuth, CourseController.getListCourseCreated);
router.get('/getListSubscribedCourse', requireAuth, CourseController.getListCourseSubscribed);
router.post('/addcomments', requireAuth, courses_controller.addComment);
router.post('/addratings', requireAuth, courses_controller.addRating);

module.exports = router;