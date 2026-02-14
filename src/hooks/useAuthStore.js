let authToken = null;
let listeners = [];

function setToken(newToken) {
    authToken = newToken;
    listeners.forEach(l => l(authToken));
}

function subscribe(listener) {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter(l => l !== listener);
    };
}

export function useAuthStore() {
    const [token, setLocalToken] = React.useState(authToken);

    React.useEffect(() => {
        return subscribe(setLocalToken);
    }, []);

    return {
        token,
        setToken,
        logout: () => setToken(null)
    };
}