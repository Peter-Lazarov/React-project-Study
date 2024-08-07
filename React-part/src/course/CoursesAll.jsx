import { useContext } from "react";
import { Link } from "react-router-dom";

import { useAllCourses } from "./useCourses";
import { AuthenticationContext } from "../user/AuthenticationContext";

export default function CoursesAll() {
    const [coursesAll, setCourses] = useAllCourses();
    const { isAuthenticated } = useContext(AuthenticationContext);

    return (
        <>
            <div className="coursesList main">
                {isAuthenticated && <Link to="/courses/create" className="create">Create New Course</Link>}

                {coursesAll.length > 0 ? (
                    <>
                        <h2>Courses</h2>
                        <ul>
                            {coursesAll.map(course => (
                                <li className="coursesItems" key={course._id}>
                                    <Link to={`/courses/${course._id}/details`}>
                                        <img src={course.image} alt={course.name} />
                                        <h3>{course.name}</h3>
                                        <p>Lecturer - {course.lecturerName}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div>
                        <h2>There are no courses</h2>
                    </div>
                )}
            </div>
        </>
    )
}

