import axios from "axios";

const serverUrl = 'http://localhost:3000';

export const server = axios.create({
    baseURL: serverUrl,
});

