import { getCookie } from "../libs";
import axios from 'axios';

const BASE = 'http://localhost:8080/api/v1/category';

export function userGetCategory() {
    const token = getCookie("__token");
    return axios({
        method: 'GET',
        url: `${BASE}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function userCreateCategory(data) {
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

export function userRemoveCategory(id) {
    const token = getCookie("__token");
    return axios({
        method: 'DELETE',
        url: `${BASE}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}


