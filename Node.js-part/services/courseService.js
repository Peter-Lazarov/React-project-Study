const Courses = require('../models/Course');
const User = require('../models/User')

exports.getAll = () => Courses.find();
exports.create = async (userId, coursesData) => {
    const createdCourses = await Courses.create({
        lecturer: userId,
        ...coursesData
    });

    //await User.findByIdAndUpdate(userId, { $push: { coursesLecturer: createdCourses._id } });

    return createdCourses;
}
exports.getOne = (CoursesId) => Courses.findById(CoursesId);
