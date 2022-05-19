import axios from 'axios';
const BASE_URL = 'https://guarded-bayou-20255.herokuapp.com/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});