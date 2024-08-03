const Courses = require('../models/Course');
const User = require('../models/User')

exports.getAll = () => Courses.find();
exports.create = async (coursesData) => {
    const createdCourses = await Courses.create({
        ...coursesData,
        lecturer: coursesData.userId
    });

    //await User.findByIdAndUpdate(userId, { $push: { coursesLecturer: createdCourses._id } });

    return createdCourses;
}
exports.getOne = (CoursesId) => Courses.findById(CoursesId);
