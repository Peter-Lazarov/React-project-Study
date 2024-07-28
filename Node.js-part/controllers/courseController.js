const courseController = require('express').Router();

const userMiddleware = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const courseService = require('../services/courseService');

courseController.get('/', async (request, response) => {
    const coursesAll = await courseService.getAll().lean();

    response.json(coursesAll);
});

courseController.post('/add', async (request, response) => {
//courseController.post('/add', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    const courseForm = request.body;

    try {
        //const createdCourse = await courseService.create(request.user._id, courseForm);
        const createdCourse = await courseService.create("John", courseForm);

        response.json(createdCourse);
    } catch (error) {
        console.error(error);

        const errorMessage = getErrorMessage(error);

        if (error.name === 'ValidationError') {
            response.status(400).json({ error: errorMessage });
        } else {
            response.status(500).json({ error: errorMessage });
        }
    }
});

courseController.get('/:courseId/details', async (request, response) => {
    const courseDetails = await courseService.getOne(request.params.courseId).lean();
    const courseLecturerId = courseDetails.publisher.toString();

    const isPublisher = courseLecturerId && courseLecturerId == request.user?._id;

    request.courseCurrent = courseDetails;
    
    response.json({ ...courseDetails, isPublisher});
});

module.exports = courseController;
