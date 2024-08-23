import axios from "axios";

const serverUrl = 'http://localhost:3000';

const server = axios.create({
    baseURL: serverUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

server.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.Authorization = accessToken && `Bearer ${accessToken}`;
    return config;
});

export default server;

