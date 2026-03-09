import { API_BASE_URL } from "../utils/enviromentVariables.js";
import { paymentAssistentApi } from "../api/paymentAssistentApi.js";

const CREATE_RECIPIENT = "/recipient";
const UPDATE_RECIPIENT = "/recipient";
const DELETE_RECIPIENT = "/recipient";
const RECIPIENT_INFO = "/recipient";
const ALL_RECIPIENTS = "/recipient/all-recipients";
const RECIPIENT_BY_NAME = "recipient/search?name="

export async function createRecipient(recipient) {
    return paymentAssistentApi.post(`${API_BASE_URL}/${CREATE_RECIPIENT}`, recipient);
}

export async function updateRecipient(id, recipientInfo) {
    return paymentAssistentApi.patch(`${API_BASE_URL}/${UPDATE_RECIPIENT}/${id}`, recipientInfo);
}

export async function deleteRecipient(id) {
    return paymentAssistentApi.delete(`${API_BASE_URL}/${DELETE_RECIPIENT}/${id}`);
}

export async function getAllRecipients() {
    return paymentAssistentApi.get(`${API_BASE_URL}/${ALL_RECIPIENTS}`);
}

export async function getRecipient(id) {
    return paymentAssistentApi.get(`${API_BASE_URL}/${RECIPIENT_INFO}/${id}`);
}

export async function searchRecipient(name) {
    const response = await paymentAssistentApi.get(
        `${API_BASE_URL}/${RECIPIENT_BY_NAME}${name}`
    );

    return response.data;
}