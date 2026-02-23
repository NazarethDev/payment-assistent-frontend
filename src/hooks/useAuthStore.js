import React from "react";
import { setGlobalToken, getToken } from "./tokenAccessor";

let listeners = [];

function notify(token) {
    listeners.forEach(l => l(token));
}

export function setToken(token) {
    setGlobalToken(token);
    notify(token);
}

export function logout() {
    setToken(null);
}

export function useAuthStore() {
    const [token, setLocalToken] = React.useState(getToken());

    React.useEffect(() => {
        const listener = (t) => setLocalToken(t);
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    return {
        token,
        isAuthenticated: !!token
    };
}
