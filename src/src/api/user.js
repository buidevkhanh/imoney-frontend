import { getCookie } from "../libs";
import axios from 'axios';

const BASE = 'http://localhost:8080/api/v1/user';

export function userValid(){
    const token = getCookie('__token');
    return new Promise((resolve, reject) => {
        if(!token) {
            reject();
        }
        axios({
            method: 'POST',
            url: `${BASE}/valid`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    });
} 

export function userLogin(email, password) {
    return axios({
        method: 'POST',
        url: `${BASE}/login`,
        data: {
            email,
            password
        }
    })
}

export function userSignUp(email, password, fullname) {
    return axios({
        method: 'POST',
        url: `${BASE}/register`,
        data: {
            email,
            password,
            fullname
        }
    })
}

export function userGetInfo() {
    const token = getCookie("__token");
    return axios({
        method: 'GET',
        url: BASE,
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export function userUpdateInfo(params) {
    const token = getCookie("__token");
    return axios({
        url: BASE,
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            ...params
        }
    })
}

export function userUpload(file) {
    const token = getCookie("__token");
    const formData = new FormData();
    formData.append("avatar",file);
    return axios.post(`http://localhost:8080/api/v1/albums/upload`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
        }
    })
}