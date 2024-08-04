import { Navigate, Outlet } from "react-router-dom"
import { AuthenticationContext } from "./AuthenticationContext";
import { useContext } from "react";

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AuthenticationContext);
    return <div>{isAuthenticated ? <Outlet /> : <Navigate to='/login' />}</div>
};

export default ProtectedRoute;
