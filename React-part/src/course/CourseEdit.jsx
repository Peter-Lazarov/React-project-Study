import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useOneCourse } from "./useCourses";
import { editCourse, getOneCourse } from "./coursesService";
import { AuthenticationContext } from "../user/AuthenticationContext";

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

export default function CourseEdit() {
    const { courseId } = useParams();
    const [course, setCourse] = useOneCourse(courseId);
    const [formValues, setFormValues] = useState(initialValues);

    const navigate = useNavigate();
    const { accessToken } = useContext(AuthenticationContext);
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

    const editHandler = async (values) => {
        try {
            const editedCourse = await editCourse(courseId, values, accessToken);
            //console.log(editCourse);

            navigate(`/courses/${editedCourse._id}/details`);
        } catch (error) {
            setErrors({...errors, additional: error.error});
            console.log(error);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const nameError = validateName(formValues.name);
        const descriptionError = validateDescription(formValues.description);
        const imageError = validateImage(formValues.image);

        if (nameError || descriptionError || imageError) {
            setErrors({ name: nameError, description: descriptionError, image: imageError });
            return;
        }

        editHandler(formValues);
    };

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
                {errors.additional && <span className="serverError">{errors.additional}</span>}
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
                        />
                        {errors.image && <span className="error">{errors.image}</span>}
                    </div>
                    <input type="submit" value="Edit Course" />
                </form>
            </div>
        </>
    )
}
