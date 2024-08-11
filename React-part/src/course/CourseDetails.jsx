import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useOneCourse } from "./useCourses";
import useForm from "../hooks/useForm";

import { AuthenticationContext } from "../user/AuthenticationContext";
import { deleteCourse } from "./coursesService";
import { useCreateComment, useGetAllComments } from "./useComments";

const initialValues = {
    text: ''
}

export default function CourseDetails() {
    const { courseId } = useParams();
    const [course] = useOneCourse(courseId);
    const [comments, dispatchComments] = useGetAllComments(courseId);
    const createComment = useCreateComment();

    const { isAuthenticated, accessToken } = useContext(AuthenticationContext);
    const [cookies] = useCookies();
    const userId = cookies.userId;

    const isLecturer = userId == course.lecturerId;
    const navigate = useNavigate();

    async function courseDeleteOnClick() {
        try {
            await deleteCourse(courseId, accessToken);
            navigate('/courses');
        } catch (error) {
            console.log(error);
        }
    }

    const {
        changeHandler,
        submitHandler,
        formValues
    } = useForm(initialValues, async ({ text }) => {

        //console.log(text, courseId, userId, accessToken);
        try {
            const newComment = await createComment(text, courseId, userId, accessToken);

            dispatchComments({ type: 'addCourseComments', payload: newComment });
        } catch (error) {
            console.log(error.message);
        }
    });

    const memoizedChangeHandler = useCallback((event) => {
        const { name, value } = event.target;
        changeHandler({ name, value });
    }, [changeHandler]);

    return (
        <>
            <div className="courseDetails">
                <h1>Course Details</h1>
                <h2>{course.name}</h2>
                <div className="information">
                    <div>
                        <img src={course.image} />
                    </div>
                    <div>
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                    </div>
                </div>
                <div className="lecturer">
                    <p>Lecturer - {course.lecturerName}</p>
                </div>
                {isLecturer && (<div className="buttons">
                    <Link onClick={courseDeleteOnClick} id='delete' >Delete</Link>
                    <Link to={`/courses/${course._id}/edit`} id='edit' >Edit</Link>
                </div>)}
            </div>

            <div className="courseCommentaries">
                <h2>Commentaries:</h2>
                {Object.values(comments).length > 0
                    ?
                    <ul>
                        {Object.values(comments).map(comment => (
                            <li key={comment._id} className="comment">
                                <p>from: {comment.userId.name}</p>
                                <p>{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                    :
                    <p className="no-comment">No commentaries.</p>
                }
            </div>

            {isAuthenticated && !isLecturer && (
                <article className="addComentary">
                    <form className="form" onSubmit={submitHandler}>
                        <label htmlFor="text">Add new commentary:</label>
                        <textarea name="text"
                            placeholder="Comment......"
                            onChange={memoizedChangeHandler}
                            value={formValues.text}
                        ></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}
        </>
    )
}
