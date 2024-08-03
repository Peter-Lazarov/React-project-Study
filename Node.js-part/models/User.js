const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 8,
        required: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true
    },
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    coursesLecturer: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    // publishedCommentary: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Commentary'
    // }]
},
    { timestamps: true });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Passwords are not the same');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;
