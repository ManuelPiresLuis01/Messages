import axios from "axios";

const API_URL:string = "http://localhost:3000";
const token:string  = localStorage.getItem("token") || "";
const Api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export default Api
