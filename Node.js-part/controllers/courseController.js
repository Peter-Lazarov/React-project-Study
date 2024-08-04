const courseController = require('express').Router();

const userMiddleware = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const courseService = require('../services/courseService');

courseController.get('/', async (request, response) => {
    const coursesAll = await courseService.getAll().lean();

    response.json(coursesAll);
});

courseController.post('/create', async (request, response) => {
//courseController.post('/add', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    const courseForm = request.body;

    try {
        //const createdCourse = await courseService.create(request.user._id, courseForm);
        const createdCourse = await courseService.create(courseForm);
        //console.log(request.body);
        //console.log(createdCourse);
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
    //const courseLecturerId = courseDetails.publisher.toString();
    //const isPublisher = courseLecturerId && courseLecturerId == request.user?._id;
    //request.courseCurrent = courseDetails;
    
    response.json({ ...courseDetails});
});

courseController.put('/:courseId/update', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    const searchedCourseId = request.params.courseId;
    const currentUserId = request.user?._id;
    
    if (isCourseLecturer(searchedCourseId, currentUserId)) {
        const courseEditForm = request.body;
        //console.log(courseEditForm);
        try {
            const courseEdited = await courseService.edit(searchedCourseId, courseEditForm);
            //response.redirect(`/course/${request.params.courseId}/details`);
            //console.log(courseEdited);
            response.json(courseEdited);
        } catch (error) {
            console.error(error);

            const errorMessage = getErrorMessage(error);

            if (error.name === 'ValidationError') {
                response.status(400).json({ error: errorMessage });
            } else {
                response.status(500).json({ error: errorMessage });
            }
        }
    } else {
        response.redirect('/course');
    }
});

courseController.delete('/:courseId/delete', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    const searchedCourseId = request.params.courseId;
    const currentUserId = request.user?._id;
    //console.log('searchedCourseId ' + searchedCourseId);
    //console.log('currentUserId ' + currentUserId);

    if (isCourseLecturer(searchedCourseId, currentUserId)) {
        try {
            const deletedSystem = await courseService.delete(request.params.courseId, request.user._id);
            //response.redirect('/course');
            response.json(deletedSystem);
        } catch (error) {
            console.error(error);

            const errorMessage = getErrorMessage(error);

            if (error.name === 'ValidationError') {
                response.status(400).json({ error: errorMessage });
            } else {
                response.status(500).json({ error: errorMessage });
            }
        }
    } else {
        response.status(403).json({ error: "User is not the publisher of the course." });
    }
});

async function isCourseLecturer(searchedCourseId, currentUserId) {
    const course = await courseService.getOne(searchedCourseId);
    //console.log(course);

    if (course && currentUserId == course.lecturerId.toString()) {
        return true;
    }
    return false;
};

module.exports = courseController;
