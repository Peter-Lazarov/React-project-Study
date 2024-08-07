import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useCreateCourse } from "./useCourses";
import { AuthenticationContext } from "../user/AuthenticationContext";
import { useState } from "react";

const initialValues = {
    name: '',
    description: '',
    image: '',
    userId: '',
    userName: ''
};

const validateName = (name) => {
    return name.length >= 3 ? '' : 'Course name must be at least 3 characters long';
};

const validateDescription = (description) => {
    return description.length >= 10 ? '' : 'Course description must be at least 10 characters long';
};

const validateImage = (image) => {
    return image.startsWith('http') ? '' : 'Course image link must start with http and to be a valid URL';
};

export default function CourseCreate(){
    const navigate = useNavigate();
    const createCourse = useCreateCourse();
    const [cookies] = useCookies();
       
    const { accessToken } = useContext(AuthenticationContext);
    const userId = cookies.userId;
    const userName = cookies.userName;

    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        let error = '';
        switch (name) {
            case 'name':
                error = validateName(value);
                break;
            case 'description':
                error = validateDescription(value);
                break;
            case 'image':
                error = validateImage(value);
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const createHandler = async (values) => {
        try {
            const valuesWithLecturer = { ...values, userId, userName };

            const createdCourse = await createCourse(valuesWithLecturer, accessToken);
            navigate(`/courses/${createdCourse._id}/details`);
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const nameError = validateName(formValues.name);
        const descriptionError = validateDescription(formValues.description);
        const imageError = validateImage(formValues.image);

        if (nameError || descriptionError || imageError) {
            setErrors({ name: nameError, description: descriptionError, image: imageError });
            return;
        }

        createHandler(formValues);
    };

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
                            placeholder="Programming course"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="courseDescription">
                        <label htmlFor="description">Course description</label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            value={formValues.description}
                            onChange={changeHandler}
                            placeholder="Overall view, Skills, Time"
                        ></textarea>
                        {errors.description && <span className="error">{errors.description}</span>}
                    </div>

                    <div className="courseImage">
                        <label htmlFor="image">Course image link</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={formValues.image}
                            onChange={changeHandler}
                            placeholder="https://site.com/image.jpg"
                        />
                        {errors.image && <span className="error">{errors.image}</span>}
                    </div>
                    <input type="submit" value="Add Course" />
                </form>
            </div>
        </>
    )
}
