import requests from "../services/requests";
import { server_url } from "../services/serverUrl";


export const getAllCourses = async () => {
    const resultAsJSON = await requests.getUnauthorised(`${server_url}/courses`);
    //console.log(resultAsJSON);
    const resultAsValues = Object.values(resultAsJSON);
    //console.log(resultAsValues);
    return resultAsValues;
};

export const getOneCourse = async (courseId) => {
    const resultAsJSON = await requests.get(`${server_url}/courses/${courseId}/details`);

    return resultAsJSON;
}

export const createCourse = async (courseData) => {
    // console.log('in api');
    // console.log(courseData);
    const result = await requests.post(`${server_url}/courses/create`, courseData);

    return result;
}
