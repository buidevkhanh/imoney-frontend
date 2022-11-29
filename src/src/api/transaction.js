import { getCookie } from "../libs";
import axios from 'axios';

const BASE = 'http://localhost:8080/api/v1/transaction';

export function userCreateTransaction(data) {
    const token = getCookie("__token");
    return axios({
        method: 'POST',
        url: `${BASE}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data
    })
}

export function userGetTransaction() {
    const token = getCookie("__token");
    return axios({
        method: 'GET',
        url: `${BASE}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function userStatistic() {
    const token = getCookie("__token");
    return axios({
        method: 'GET',
        url: `${BASE}/statistic`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

