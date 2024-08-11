import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthenticationContext } from './AuthenticationContext';

const PublicRoute = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PublicRoute;
