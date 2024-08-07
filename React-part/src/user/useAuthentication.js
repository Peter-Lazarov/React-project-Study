import { useContext } from "react";

import { AuthenticationContext } from "./AuthenticationContext";
import { loginRequest, registerRequest, logoutRequest, loginRequestAxios } from "./authenticationService";

export const useLogin = () => {
    const loginHandler = async (email, password) => {
        try {
            const { password: passwordReceived, ...authenticationData } = await loginRequestAxios(email, password);

            return authenticationData;
        } catch (error) {
            console.log(error.message);
        }
    }

    return loginHandler;
};

export const useRegister = () => {
    const registerHandler = async (email, password, name) => {
        try {
            const { password: passwordReceived, ...authenticationData } = await registerRequest(email, password, name);
            
            return authenticationData;
        } catch (error) {
            console.log(error.message);
        }
    }

    return registerHandler;
};
