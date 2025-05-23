import axios from "axios";
const token = localStorage.getItem("token")
const api = axios.create({
    baseURL : "https://dokan-server.onrender.com",
    // baseURL : "http://192.168.0.107:4000",
    headers : {
        token : token ? token : null
    }
});

export default api;