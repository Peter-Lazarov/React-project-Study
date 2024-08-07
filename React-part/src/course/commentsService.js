import requests from "../services/requests";
import { server_url } from "../services/serverUrl";

export const createComment = async (text, courseId, userId, accessToken) => {
    const result = await requests.postWithCredentials(server_url + `/courses/${courseId}/commentary`, {text, courseId, userId }, accessToken);
    //console.log(result);
    return result;
}

export const getAllComments = async (courseId) => {
    const result = await requests.get(server_url + `/courses/${courseId}/commentary`);
    //const comments = Object.values(result);
    //console.log(result);
    return result;
}
