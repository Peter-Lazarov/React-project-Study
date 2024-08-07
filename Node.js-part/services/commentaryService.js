const { default: mongoose } = require('mongoose');

const Commentary = require('../models/Commentary');

const Course = require('../models/Course');
const User = require('../models/User')

exports.create = async (text, courseId, userId) => {

    const createdCommentary = await Commentary.create({
        text,
        userId,
        courseId
    });

    await User.findByIdAndUpdate({ _id: userId }, { $push: { userCommentaries: createdCommentary._id } });
    await Course.findByIdAndUpdate({ _id: courseId }, { $push: { courseCommentaries: createdCommentary._id } });

    return createdCommentary;
}

exports.getAllForCourse = (courseId) => {
    let objectId = new mongoose.Types.ObjectId(courseId);
    return Commentary.find({ courseId: objectId }).populate('userId', 'name');
};

exports.delete = async (courseId, userId) => {
    const courseDeleted = await Course.findOneAndDelete({ _id: courseId, lecturerId: userId });
    await User.findOneAndUpdate({ _id: userId }, { $pull: { coursesLecturer: courseId } });

    return courseDeleted;
};
