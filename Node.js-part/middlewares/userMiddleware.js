const jsonwebtoken = require('jsonwebtoken');
const { secretKey } = require('../config');
const { authorisationCookie } = require('../utility/cookie');

exports.attachUserInRequest = (request, response, next) => {
    const token = request.cookies[authorisationCookie] || '';
    
    if(!token){
       return next();
    }
    
    try {
        const decodedToken = jsonwebtoken.verify(token, secretKey);
        request.user = decodedToken;
        //console.log('inMiddleware ' + JSON.stringify(request.user));
        next();
    } catch (error) {
        console.log(error);
        response.clearCookie(authorisationCookie).status(204);
        response.redirect('/');
    }
};

exports.isAuthenticated = (request, response, next) => {
    if (!request.user) {
        return response.redirect('/user/login');
    }
    //console.log('inAuthenticate ' + JSON.stringify(request.user));
    next();
};

exports.isGuest = (request, response, next) => {
    if (request.user) {
        return response.redirect('/');
    }

    next();
};
