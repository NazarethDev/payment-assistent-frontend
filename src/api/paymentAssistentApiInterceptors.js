import { paymentAssistentApi } from "./paymentAssistentApi.js"

paymentAssistentApi.interceptors.request.use((config) => {

    const token = sessionStorage.getItem("authToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

paymentAssistentApi.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {

            sessionStorage.removeItem("authToken");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);