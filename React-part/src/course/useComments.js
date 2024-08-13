import { useEffect, useReducer, useState } from "react";
import { createComment, getAllComments } from "./commentsService";

export function useCreateComment() {
    const commentCreateHandler = async (text, courseId, userId, accessToken) => {
        //console.log(commentText);
        const result = await createComment(text, courseId, userId, accessToken);
        return result;
    }

    return commentCreateHandler;
}

export function commentReducer(currentState, action) {
    switch (action.type) {
        case 'loadComments':
            const payload = action.comments;

            if (payload != undefined) {
                return {
                    ...currentState,
                    ...payload
                }
            } else {
                return currentState;
            }
        default:
            return currentState;
    }
}

export function useGetAllComments(courseId) {
    //const [comments, setComments] = useState();
    const [comments, dispatch] = useReducer(commentReducer, {});

    useEffect(() => {
        (async () => {
            const courseCommentaries = await getAllComments(courseId);
            //console.log(courseCommentaries);
            dispatch({ type: 'loadComments', comments: courseCommentaries });
        })()
    }, [courseId])

    return [comments, dispatch];
}
