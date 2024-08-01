import { createContext, useContext, useState } from "react";
import usePersistedState from "./usePersistedState";

export const AuthenticationContext = createContext({
    userId: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthenticationState: (authenticationState = {}) => null,
    logoutFunction: () => null
});

export function AuthenticationContextProvider(props) {
    //const [authenticationState, setAuthenticationState] = useState({});
    const [authenticationState, setAuthenticationState] = usePersistedState('authentication', {}); //accessToken

    const changeAuthenticationState = (state) => {
        //localStorage.setItem('accessToken', state.accessToken);

        setAuthenticationState(state);
    };

    // const logoutFunction = () => {
    //     setAuthenticationState(null);
    // };

    function logoutFunction() {
        setAuthenticationState({});
    };

    let contextData = {};
    //console.log(authenticationState);
    
    if(authenticationState != null && authenticationState != {}){
        contextData = {
            userId: authenticationState._id,
            email: authenticationState.email,
            accessToken: authenticationState.accessToken,
            isAuthenticated: !!authenticationState.email,
            changeAuthenticationState,
            logoutFunction
        };
    }

    return (
        <AuthenticationContext.Provider value={contextData}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthenticationContext() {
    const authenticationData = useContext(AuthenticationContext);

    return authenticationData;
}
