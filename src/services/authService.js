import { paymenteAssistentApi } from "../api/paymentAssistentApi";
import { setToken } from "../hooks/useAuthStore";

export async function login(username, password) {
    const response = await paymenteAssistentApi.post("/auth/login", {
        username,
        password
    });

    const token = response.data.token;

    setToken(token);

    return token;
}
