const userController = require('express').Router();
const userService = require('../services/userService');

const { isAuthenticated } = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const { authorisationCookie, userIdCookie, userNameCookie, userEmailCookie } = require('../utility/cookie');
const { findOneAndDelete } = require('../models/Course');

userController.post('/register', async (request, response) => {
    try {
        const userData = request.body;
        //console.log('controler register ' + JSON.stringify(request.body));

        const { _id, email, name, token } = await userService.register(userData);

        //response.cookie(authorisation, token, { httpOnly: true, sameSite: 'none', secure: true })
        //response.cookie(authorisationCookie, token, { httpOnly: true, sameSite: 'none', secure: false }); //this is better but require https
                
        response.cookie(authorisationCookie, token, { httpOnly: false });
 
        response.json({
            _id,
            email,
            name,
            //accessToken: token
        });
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

userController.post('/login', async (request, response) => {
    try {
        const userData = request.body;
        //console.log('controler register ' + request.body);

        const { _id, email, token, name } = await userService.login(userData);

        //response.cookie(authorisationCookie, token, { httpOnly: false, sameSite: 'none', secure: false }); //this is better but require https
        //console.log(authorisationCookie, token);

        response.cookie(userIdCookie, _id.valueOf(), { httpOnly: false });
        response.cookie(userEmailCookie, email.valueOf(), { httpOnly: false });
        response.cookie(authorisationCookie, token, { httpOnly: false});
        response.cookie(userNameCookie, name, { httpOnly: false });

        //console.log(_id.valueOf());
        //console.log(email);
        //console.log(name);
        //console.log(token);

        response.json({
            _id,
            email,
            accessToken: token
        });
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

userController.post('/logout', isAuthenticated, (request, response) => {
    //console.log('in logout and delete');
    response.clearCookie(authorisationCookie).status(204);
    response.clearCookie(userIdCookie).status(204);
    response.clearCookie(userEmailCookie).status(204);
    response.clearCookie(userNameCookie).status(204);
    response.json({ ok: true });
});

userController.get('/profile', async (request, response) => {
    try {
        const userObject = request.user;
        //console.log('userObject ' + userObject);
        
        const { _id, email, name } = await userService.profileSearch(userObject);

        response.json({
            _id,
            email,
            name,
        });
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

userController.get('/:userId/name', async (request, response) => {
    try {
        const userId = request.params.userId;
        const { name } = await userService.getUserName(userId);

        response.json(name);
    } catch (error) {
        console.error(error);

        const errorMessage = error.message;

        if (error.name === 'ValidationError') {
            response.status(400).json({ error: errorMessage });
        } else {
            response.status(500).json({ error: errorMessage });
        }
    }
});

userController.get('/all', async (request, response) => {
    try {
        const usersAll = await userService.getAll();
        
        response.json(usersAll);
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

// userController.put('/profile', isAuthenticated, editProfileInfo);


// function editProfileInfo(req, res, next) {
//     const { _id: userId } = req.user;
//     const { tel, username, email } = req.body;

//     userModel.findOneAndUpdate({ _id: userId }, { tel, username, email }, { runValidators: true, new: true })
//         .then(x => { res.status(200).json(x) })
//         .catch(next);
// }

module.exports = userController;
