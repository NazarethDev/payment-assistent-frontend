import { paymentAssistentApi } from "../api/paymentAssistentApi";

export async function login(username, password) {

    const response = await paymentAssistentApi.post("/user/login", {
        username,
        password
    });

    return response.data.token;
}