import axios from "axios";
const token = localStorage.getItem("token")
const api = axios.create({
    baseURL : "https://dokan-server.onrender.com",
    headers : {
        token : token ? token : null
    }
});

export default api;
