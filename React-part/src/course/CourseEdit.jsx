import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import useForm from "../hooks/useForm";
import { useOneCourse } from "./useCourses";
import { editCourse, getOneCourse } from "./coursesService";
import { AuthenticationContext } from "../user/AuthenticationContext";
import { useState } from "react";

const initialValues = {
    name: '',
    description: '',
    image: '',
};

export default function CourseEdit() {
    const { courseId } = useParams();
    //const [course, setCourse] = useOneCourse(courseId);
    const [course, setCourse] = useOneCourse(courseId);

    const navigate = useNavigate();
    const { accessToken } = useContext(AuthenticationContext);

    const editHandler = async (values) => {
        try {
            const editedCourse = await editCourse(courseId, values, accessToken);
            //console.log(editCourse);

            navigate(`/courses/${editedCourse._id}/details`);
        } catch (error) {
            console.log(error);
        }
    }

    const {
        formValues,
        changeHandler,
        submitHandler,
        setFormValues
    } = useForm(course, editHandler);

    useEffect(() => {
        setFormValues(course);
    }, [course]);

    //console.log('here 1');
    //console.log(course);

    return (
        <>
            <div className="courseEdit">
                {/* {console.log('here 10')} */}
                <h2>edit Course</h2>
                <form onSubmit={submitHandler}>
                    <div className="courseName">
                        <label htmlFor="name">Course name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formValues.name}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="courseDescription">
                        <label htmlFor="description">Course description</label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            value={formValues.description}
                            onChange={changeHandler}
                        ></textarea>
                    </div>

                    <div className="courseImage">
                        <label htmlFor="image">Course image link</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={formValues.image}
                            onChange={changeHandler}
                        />
                    </div>
                    <input type="submit" value="Edit Course" />
                </form>
            </div>
        </>
    )
}
