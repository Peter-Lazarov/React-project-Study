import { useContext } from "react";

import { AuthenticationContext } from "./AuthenticationContext";
import { loginRequest, registerRequest, logoutRequest, loginRequestAxios } from "./authenticationService";


export const useLogin = () => {
    const { addCookieAuthenticationState } = useContext(AuthenticationContext);

    const loginHandler = async (email, password) => {
        try {
            //const { password: passwordReceived, ...authenticationData } = await loginRequest(email, password);
            const { password: passwordReceived, ...authenticationData } = await loginRequestAxios(email, password);
            //console.log(authenticationData);
            //addCookieAuthenticationState(authenticationData);

            return authenticationData;
        } catch (error) {
            console.log(error.message);
        }
    }

    return loginHandler;
};

export const useRegister = () => {
    const { addCookieAuthenticationState } = useContext(AuthenticationContext);

    const registerHandler = async (email, password, name) => {
        // try {
        //     const authenticationData = await registerRequest(email, password);
        //     //console.log(authenticationData);
        //     addCookieAuthenticationState(authenticationData);

        //     return authenticationData;
        // } catch (error) {
        //     console.log(error.message);
        // }

        const { password: passwordReceived, ...authenticationData } = await registerRequest(email, password, name);
        // console.log('AuthenticationContext');
        // console.log(AuthenticationContext);
        // console.log('authenticationData');
        // console.log(authenticationData);
        addCookieAuthenticationState(authenticationData);

        return authenticationData;
    }

    return registerHandler;
};

// export const useLogout = () => {
//     const { logoutFunction } = useContext(AuthenticationContext);

//     const logoutHandler = async () => {
//         await logoutRequest();
//         logoutFunction();
//     }

//     return logoutHandler;
// }
