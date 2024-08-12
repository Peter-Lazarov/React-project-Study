import requests from "../services/requests";
import { server_url } from "../services/serverUrl";

export const getAllLecturers = async () => {
    const resultAsJSON = await requests.get(`${server_url}/user/all`);
    //console.log(resultAsJSON);
    const resultAsValues = Object.values(resultAsJSON);
    //console.log(resultAsValues);
    return resultAsValues;
};
