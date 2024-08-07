const commentaryController = require('express').Router();

const userMiddleware = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const commentaryService = require('../services/commentaryService');

commentaryController.get('/', async (request, response) => {
    const baseUrl = request.baseUrl;
    const courseId = baseUrl.split('/')[2];
    
    //console.log(courseId);
    try {
        const commentaryAll = await commentaryService.getAllForCourse(courseId);
        response.json(commentaryAll);
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

commentaryController.post('/', userMiddleware.attachUserInRequest, userMiddleware.isAuthenticated, async (request, response) => {
    try {
        const { text, courseId, userId } = request.body;
        
        const createdCommentary = await  commentaryService.create(text, courseId, userId);
        response.json(createdCommentary);
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

module.exports = commentaryController;
