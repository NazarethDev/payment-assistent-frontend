import axios from "axios";
import { API_BASE_URL } from "../utils/enviromentVariables.js";

export const paymenteAssistentApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})