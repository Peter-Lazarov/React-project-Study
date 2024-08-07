import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const AuthenticationContext = createContext({
    userId: null,
    email: null,
    accessToken: null,
    isAuthenticated: false,
    logoutAuthenticationState: () => {}
});

export function AuthenticationContextProvider(props) {
    const [cookies] = useCookies(['authorisation']);
    const [contextData, setContextData] = useState({
        userId: null,
        email: null,
        accessToken: null,
        isAuthenticated: false
    });

    useEffect(() => {
        const token = cookies.authorisation;
        if (token) {
            setContextData({
                ...contextData,
                accessToken: token,
                isAuthenticated: !!token
            });
        }
    }, [cookies]);

    function logoutAuthenticationState() {
        setContextData({
            userId: null,
            email: null,
            accessToken: null,
            isAuthenticated: false
        });
    }

    return (
        <AuthenticationContext.Provider value={{ ...contextData, logoutAuthenticationState }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}
