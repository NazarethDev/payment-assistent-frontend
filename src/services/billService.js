import axios from "axios";

import { API_BASE_URL } from "../utils/enviromentVariables.js";

const CREATE_BILL = "/bill";
const UPDATE_BILL = "/bill"
const GET_TODAY_BILLS = "/bill/today-bills";
const DOWNLOAD_TODAY_BILLS = "/bill/download-today-bills";
const DELETE_BILL = "/bill/delete";

export async function createBill(bill) {
    return axios.post(`${API_BASE_URL}${CREATE_BILL}`, bill);
};

export async function updateBill(id, bill) {
    return axios.patch(`${API_BASE_URL}${UPDATE_BILL}/${id}`, bill);
};

export async function deleteBill(id) {
    return axios.delete(`${API_BASE_URL}${DELETE_BILL}/${id}`);
};

export async function getTodayBills() {
    return axios.get(`${API_BASE_URL}${GET_TODAY_BILLS}`);
};

export async function downloadTodayBills() {
    return axios.get(`${API_BASE_URL}${DOWNLOAD_TODAY_BILLS}`, {
        responseType: "blob"
    })
};