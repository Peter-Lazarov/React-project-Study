const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    description:{
        type: String,
        minlength: 2,
        required: true
    },
    image: {
        type: String,
        //match: /^https?:\/\/.*$/,
        required: false
    },
    lecturer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        ref: 'User'
    }
    // lecturer:{
    //     type: ,
    //     ref: 'User'
    // }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
