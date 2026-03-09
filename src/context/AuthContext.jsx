import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    function login(token) {
        sessionStorage.setItem("authToken", token);
        setToken(token);
    }

    function logout() {
        sessionStorage.removeItem("authToken");
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}