import axios from "axios";
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

export const getSearchedCourses = async (searchedWord) => {
    const resultAsJSON = await requests.getUnauthorised(`${server_url}/courses/search?searchedWord=${searchedWord}`);
    return resultAsJSON;
}

export const createCourse = async (courseData, accessToken) => {
    // console.log('in api');
    // console.log(courseData);
    const result = await requests.postWithCredentials(`${server_url}/courses/create`, courseData, accessToken);

    return result;
}

export const editCourse = async (courseId, courseData, accessToken) => {
    const result = await requests.putWithCredentials(`${server_url}/courses/${courseId}/update`, courseData, accessToken);

    return result;
}

export const deleteCourse = async (courseId, accessToken) => {
    const result = await requests.deleteWithCredentials(`${server_url}/courses/${courseId}/delete`, undefined, accessToken);

    return result;
}
