import { io } from 'socket.io-client';
const url = "https://ai-agent-5f8g.onrender.com"

const token = localStorage.getItem("token");

const socket = io(url, {
    auth : {
        token
    }
})

export default socket;