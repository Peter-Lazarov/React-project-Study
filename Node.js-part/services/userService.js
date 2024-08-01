const User = require('../models/User');
const bcrypt = require('bcrypt');

const jsonwebtoken = require('jsonwebtoken');
//const util = require('util');
//const jsonwebtokenSign = util.promisify(jsonwebtoken.sign());
//const jsonwebtokenVerify = util.promisify(jsonwebtoken.verify());
const { secretKey } = require('../config');

exports.register = async (userForm) => {
    const userFromDatabase = await User.findOne({ email: userForm.email });
    //console.log(userForm);

    if(userFromDatabase){
        throw new Error('You must use another email');
    }

    const createdUser = await User.create(userForm);
    //console.log(createdUser.createdAt);

    const token = await generateToken(createdUser);

    const userObjectWithToken = {
        _id: createdUser._id,
        email: createdUser.email,
        token
    }

    return userObjectWithToken;
};

exports.login = async (userData) => {
    const userFromDatabase = await User.findOne({ email: userData.email })

    if (!userFromDatabase) {
        throw new Error('User or Password do not match - user');
    }

    const isValid = await bcrypt.compare(userData.password, userFromDatabase.password);
    if(!isValid){
        throw new Error('User or Password do not match - password');
    }

    const token = await generateToken(userFromDatabase);

    return {
        _id: userFromDatabase._id,
        email: userFromDatabase.email,
        token
    }
};

exports.profileSearch = async (userObject) => {
    const userFromDatabase = await User.findOne({ _id: userObject._id });

    return {
        _id: userFromDatabase._id,
        email: userFromDatabase.email,
        name: userFromDatabase.name
    }
};

exports.getUserName = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user ? { name: user.name } : null;
    } catch (error) {
        throw error;
    }
};

function generateToken(userObject){
    const payload = {
        _id: userObject._id,
        email: userObject.email
    };

    return jsonwebtoken.sign(payload, secretKey, { expiresIn: '2d'});
};
