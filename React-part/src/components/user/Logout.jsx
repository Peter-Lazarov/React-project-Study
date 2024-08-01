import { Navigate } from "react-router-dom";

import { useLogout } from "../../hooks/useAuthentication";

export default function Logout(){
    const logoutHook = useLogout();

    logoutHook();

    return (
        <>
            <Navigate to="/"/>
        </>
    )
}
