const Course = require('../models/Course');
const User = require('../models/User')

exports.getAll = () => Course.find();
exports.create = async (courseData) => {
    const createdCourse = await Course.create({
        ...courseData,
        lecturerId: courseData.userId,
        lecturerName: courseData.userName
    });

    const createdCourseId = createdCourse.courseId;
    const createdCourseUserId = courseData.userId;

    await User.findOneAndUpdate({ _id: createdCourseUserId }, { $push: { coursesLecturer: createdCourseId } });

    return createdCourse;
};
exports.getOne = (courseId) => Course.findById({ _id: courseId });
exports.edit = async (courseId, courseData) => {
    return await Course.findByIdAndUpdate({ _id: courseId}, courseData, { runValidators: true });
};
exports.delete = async (courseId, userId) => {
    const courseDeleted = await Course.findOneAndDelete({ _id: courseId, lecturerId: userId });
    await User.findOneAndUpdate({ _id: userId }, { $pull: { coursesLecturer: courseId } });

    return courseDeleted;
};
