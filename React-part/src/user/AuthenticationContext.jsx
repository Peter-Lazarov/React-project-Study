import { createContext, useState } from "react";

export const AuthenticationContext = createContext({
    userId: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    addCookieAuthenticationState: (authenticationState = '') => null,
    logoutAuthenticationState: () => null
});

export function AuthenticationContextProvider(props) {
    const [authenticationState, setAuthenticationState] = useState('');

    function addCookieAuthenticationState(authenticationToken) {
        setAuthenticationState(authenticationToken);
    };

    function logoutAuthenticationState() {
        setAuthenticationState('');
    };

    let contextData = {};

    contextData = {
        accessToken: authenticationState,
        isAuthenticated: !!authenticationState,
        addCookieAuthenticationState,
        logoutAuthenticationState
    };


    return (
        <AuthenticationContext.Provider value={contextData}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}
