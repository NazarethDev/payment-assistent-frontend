import { paymenteAssistentApi } from "./paymentAssistentApi.js"
import { getToken } from "../hooks/tokenAccessor.js"

paymenteAssistentApi.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

paymenteAssistentApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem("authToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);