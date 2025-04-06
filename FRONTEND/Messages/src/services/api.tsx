import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const token:string  = localStorage.getItem("token") || "";
const Api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export default Api
