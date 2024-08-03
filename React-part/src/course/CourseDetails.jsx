import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useOneCourse } from "./useCourses";
import useForm from "../hooks/useForm";

import { AuthenticationContext } from "../user/AuthenticationContext";

const initialValues = {
    comment: ''
}

export default function CourseDetails() {
    //const [loading, setLoading] = useState(false);

    const { courseId } = useParams();
    //console.log(courseId);

    const [course] = useOneCourse(courseId);

    //const [comments, setComments] = useGetAllComments(courseId);
    //const [comments, dispatchComments] = useGetAllComments(courseId);
    //const createComment = useCreateComment();

    const { isAuthenticated } = useContext(AuthenticationContext);
    const [cookies] = useCookies();
    //console.log('here 1 ' + cookies.userId);
    const userId = cookies.userId;

    const isLecturer = userId == course.lecturer;

    const {
        changeHandler,
        submitHandler,
        formValues
    } = useForm(initialValues, async ({ comment }) => {

        try {
            const newComment = await createComment(courseId, comment);

            // //with useState
            // if (comments != undefined && comments != null) {
            //     const commentId = `comment${Object.keys(comments).length + 1}`;
            //     setComments({ ...comments, [commentId]: newComment });
            // } else {
            //     setComments({ ...comments, newComment });
            // }

            //with useReducer
            dispatchComments({ type: 'addCourseComments', payload: newComment })
        } catch (error) {
            console.log(error.message);
        }
    });

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    //console.log(comments);

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
                    <p>Lecturer {course.userName}</p>
                </div>
                {isLecturer && (<div className="buttons">
                    <Link href="#">Edit</Link>
                    <Link href="#">Delete</Link>
                </div>)}
            </div>
            
            {isAuthenticated && !isLecturer &&(
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={submitHandler}>

                        <textarea name="comment"
                            placeholder="Comment......"
                            onChange={changeHandler}
                            value={formValues.comment}
                        ></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}
        </>
    )
}
