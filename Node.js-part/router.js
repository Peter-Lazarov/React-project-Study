const router = require('express').Router();

const courseController = require('./controllers/courseController');
const userController = require('./controllers/userController');
const commentaryController = require('./controllers/commentaryController');

router.use('/courses', courseController);
router.use('/user', userController);
router.use('/courses/:courseId/commentary', commentaryController);

router.all('*', (request, response) => {
    console.log('in router * ');
    console.log(request);
    response.render('404');
});

module.exports = router;
