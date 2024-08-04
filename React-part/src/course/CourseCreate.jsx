import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import useForm from "../hooks/useForm";
import { useCreateCourse } from "./useCourses";

const initialValues = {
    name: '',
    description: '',
    image: '',
    userId: '',
    userName: ''
};

export default function CourseCreate() {
    const navigate = useNavigate();
    const createCourse = useCreateCourse();
    const [cookies] = useCookies();
    //console.log('here 1 ' + cookies.userName);
    //console.log('here 1 ' + cookies.userId);
    const userId = cookies.userId;
    const userName = cookies.userName;
    // useEffect(() => {
    //     console.log(cookies.userName);
    // }, []);

    const createHandler = async (values) => {
        try {
            const valuesWithLecturer = {...values, userId, userName};
            
            //const { _id: courseId } = await createCourse(valuesWithLecturer);
            const createdCourse = await createCourse(valuesWithLecturer);
            //console.log(result);
            //console.log(createdCourse);
            navigate(`/courses/${createdCourse._id}/details`);
        } catch (error) {
            console.log(error);
        }
    }

    const {
        formValues,
        changeHandler,
        submitHandler
    } = useForm(initialValues, createHandler);

    return (
        <>
            <div className="courseCreate">
                <h2>add Course</h2>
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
                    <input type="submit" value="Add Course"/>
                </form>
            </div>
        </>
    )
}
