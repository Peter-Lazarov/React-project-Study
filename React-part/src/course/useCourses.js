import { useEffect, useState } from "react"

import { getAllCourses, getOneCourse, createCourse } from "./coursesService";

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

export function useOneCourse(courseId){
    const [course, setCourse] = useState({});
    
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

export function useCreateCourse() {
    const courseCreateHandler = async (courseData) => {
        const result = await createCourse(courseData);
        return result;
    }

    return courseCreateHandler;
}
