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
    lecturerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    lecturerName: {
        type: String,
        ref: 'User'
    },
    courseCommentaries: [{
        type: mongoose.Types.ObjectId,
        ref: 'Commentary'
    }]
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
