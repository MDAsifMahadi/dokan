import { useContext, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import {RiAccountCircleLine, RiLockPasswordLine} from "react-icons/ri";
import {MdOutlineMail} from "react-icons/md";
import api from "../utility/api";
import MassContext from "../contexts/MessContext";
import { Navigate, useNavigate } from "react-router-dom";


const LoginOrsinup = ({isLogin}) => {
    const toast = useContext(MassContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            userName: name.trim(),
            email : email.trim(),
            password};
        try {
            const res = await api.post("/api/login", data);
            const {token, message} = res.data; 
            await localStorage.setItem("token", token);
            toast.success(message);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    if(isLogin) {
        return <Navigate to="/" replace />
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form className="w-120 p-5 shadow-md bg-gray-200 rounded-md space-y-3 m-4"
                onSubmit={handleSubmit}
            >
                <h2 className="text-center font-bold text-2xl pb-3">Log in your account</h2>

                {/* username input with icon */}
                <div className="w-full relative">
                    <RiAccountCircleLine
                        className=" absolute top-3.5 left-3 text-[1.5rem] text-[#777777]"/>
                    <input
                        type="text"
                        name="name"
                        id="text"
                        required
                        placeholder="Username"
                        className="peer border-border border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                        onChange={e=> setName(e.target.value)}
                    />
                </div>


                {/* email input with icon */}
                <div className="w-full  relative">
                    <MdOutlineMail
                        className=" absolute top-3.5 left-3 text-[1.5rem] text-[#777777]"/>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Email address"
                        className="peer border-border border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                        onChange={e=> setEmail(e.target.value)}
                    />
                </div>


                {/* password input with icon */}
                <div className="w-full  relative">
                    <RiLockPasswordLine
                        className=" absolute top-3.5 left-3 text-[1.5rem] text-[#777777]"/>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder="Password"
                        className="peer border-border border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                        onChange={e=> setPassword(e.target.value)}
                    />
                </div>

                 <input
                    className="px-6 mt-3 py-2 w-full border border-[#3B9DF8] bg-[#3B9DF8] text-primary text-[#fff]  transition duration-300 rounded text-xl font-bold cursor-pointer focus:ring-1 ring-offset-2 ring-sky-800" type="submit" value="Login" />
                
                
                <p className="text-[#064d8f] text-center"><BsInfoCircle className="inline w-8"/>If you forget your password, please contact your client.</p>
            </form>
        </div>
    );
};

export default LoginOrsinup;
