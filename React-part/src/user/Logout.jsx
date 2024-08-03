import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { logoutRequest, logoutRequestAxios } from "./authenticationService";
import { AuthenticationContext } from "./AuthenticationContext";

export default function Logout() {
    const { accessToken, logoutAuthenticationState } = useContext(AuthenticationContext);

    const logoutAction = async () => {
        await logoutRequestAxios(accessToken);
        logoutAuthenticationState();
    }

    logoutAction();

    return (
        <>
            <Navigate to="/" />
        </>
    )
}
