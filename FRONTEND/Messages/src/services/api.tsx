import axios from "axios";

const API_URL = "http://192.168.43.224:3001";
const token:string  = localStorage.getItem("token") || "";
const Api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export default Api
