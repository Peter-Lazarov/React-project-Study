import requests from "../../services/requests";
import { server_url } from "../../services/serverUrl";

export const loginRequest = async (email, password) => {
    const authenticationData = await requests.post(`${server_url}/user/login`, { email, password });
    //console.log(authenticationData);
    return authenticationData;
};

export const registerRequest = async (email, password, name) => {
    const authenticationData = await requests.post(`${server_url}/user/register`, { email, password, name });
    
    return authenticationData;
};

export const logoutRequest = async () => requests.get(`${server_url}/user/logout`);
