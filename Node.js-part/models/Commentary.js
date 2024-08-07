const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
    text: {
        type: String,
        minlength: 2,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }
})

const Commentary = mongoose.model('Commentary', commentarySchema);

module.exports = Commentary;
