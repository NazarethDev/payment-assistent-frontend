import { setGlobalToken } from "../hooks/tokenAccessor.js"
import { paymenteAssistentApi } from "../api/paymentAssistentApi.js"

export async function login(email, password) {
    const response = await paymenteAssistentApi.post("/auth/login", { email, password });

    const token = response.data.token;

    setGlobalToken(token);

    return token;
}