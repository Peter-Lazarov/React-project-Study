const router = require('express').Router();

const courseController = require('./controllers/courseController');

router.use('/course', courseController);

router.all('*', (request, response) => {
    response.render('404');
});

module.exports = router;
