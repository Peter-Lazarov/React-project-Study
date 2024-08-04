import axios from "axios";

import requests from "../services/requests";
import { server_url } from "../services/serverUrl";

export const loginRequest = async (email, password) => {
    const authenticationData = await requests.post(`${server_url}/user/login`, { email, password });
    //console.log(authenticationData);
    return authenticationData;
};

export const loginRequestAxios = async (email, password) => {
    const responseObject = await axios.post(`${server_url}/user/login`, { email, password }, { withCredentials: true });

    const authenticationData = responseObject.data;
    //console.log(authenticationData);

    return authenticationData;
};

export const registerRequest = async (email, password, name) => {
    const authenticationData = await requests.post(`${server_url}/user/register`, { email, password, name });

    return authenticationData;
};

export const logoutRequest = async (accessToken) => {
    requests.post(`${server_url}/user/logout`, undefined, accessToken);
}

export const logoutRequestAxios = async () => {
    await axios.post(`${server_url}/user/logout`, undefined, { withCredentials: true });
}
