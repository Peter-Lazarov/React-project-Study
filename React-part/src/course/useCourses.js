import { useEffect, useState } from "react"

import { getAllCourses, getOneCourse } from "./coursesService";

export function useAllCourses() {
    const [course, setCourse] = useState([]);

    useEffect(() => {
        (async () => {
            const courseAll = await getAllCourses();
            setCourse(courseAll);
            //console.log(courseAll);
        })();
    }, []);

    return [course, setCourse];
}

export function useOneCourse(courseId) {
    const initialValues = {
        _id: "",
        name: "",
        description: "",
        image: "",
        lecturerId: "",
        lecturerName: "",
        __v: 0
    }
    
    const [course, setCourse] = useState(initialValues);//useState({});

    useEffect(() => {
        (async () => {

            const courseOne = await getOneCourse(courseId);
            setCourse(courseOne);
            //console.log(courseId);
            //console.log(courseOne);
        })();
    }, [courseId]);


    return [course, setCourse];
}
