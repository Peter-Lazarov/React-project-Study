import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthenticationContext } from "../user/AuthenticationContext";
import { getAllLecturers } from "./lecturerService";

export default function LecturersAll() {
    const [lecturers, setCourse] = useState([]);

    useEffect(() => {
        (async () => {
            const lecturersAll = await getAllLecturers();

            setCourse(lecturersAll);
            //console.log(lecturersAll);
        })();
    }, []);

    const { isAuthenticated } = useContext(AuthenticationContext);

    return (
        <>
            <div className="lecturersList main">
                {lecturers.length > 0 ? (
                    <>
                        <h2>Lecturers</h2>
                        <ul>
                            {lecturers.map(lecturer => (
                                <li className="lecturersItems" key={lecturer._id}>
                                    <h3>{lecturer.name}</h3>
                                    <ul>
                                        {lecturer.coursesLecturer.map(course => (
                                            <li className="courseItems" key={course._id}>
                                                <Link to={`/courses/${course._id}/details`}>
                                                    <p>{course.name}</p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div>
                        <h2>There are no lecturers</h2>
                    </div>
                )}
            </div>
        </>
    )
}

