import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AuthenticationContext } from './AuthenticationContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);
    const [cookies] = useCookies(['authorisation']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cookies.authorisation) {
            // Update context with the token
            // Assuming you have a method to update the context
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [cookies]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
