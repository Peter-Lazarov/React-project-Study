const router = require('express').Router();

const courseController = require('./controllers/courseController');
const userController = require('./controllers/userController');

router.use('/course', courseController);
router.use('/user', userController);

router.all('*', (request, response) => {
    response.render('404');
});

module.exports = router;
