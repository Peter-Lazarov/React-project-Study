import { useState } from "react";

export default function usePersistedState(key, initialState) {
    const [state, setState] = useState(() => {

        const authString = localStorage.getItem(key);

        if (!authString) {
            if (typeof initialState === 'function') {
                return initialState();
            } else {
                return initialState;
            }
        }

        const authObject = JSON.parse(authString);
        return authObject;
    });

    const updateState = (value) => {
        const newState = typeof value === 'function'
            ? value(state)
            : value;

        //console.log(newState);

        if (newState == null || Object.keys(newState).length === 0) {
            localStorage.removeItem(key);
        }else {
            localStorage.setItem(key, JSON.stringify(newState.accessToken));
        }

        setState(newState);
    }

    return [state, updateState];
}
