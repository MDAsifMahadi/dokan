import axios from "axios";
const token = localStorage.getItem("token")
const api = axios.create({
    baseURL : "https://dokan-server.onrender.com",
<<<<<<< HEAD
    // baseURL : "http://192.168.0.107:4000",
=======
>>>>>>> 93413124e88446d149b2969819775fe2197be8cd
    headers : {
        token : token ? token : null
    }
});

export default api;
