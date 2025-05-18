import Card from '../components/Card'
import { FaPlus} from "react-icons/fa6";
import icon from "../assets/dokan.png";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import api from "../utility/api";
import MessContext from "../contexts/MessContext";
import { FiLoader } from 'react-icons/fi';

const Home = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const toast = useContext(MessContext);
  const navigate = useNavigate();

  useEffect(()=> {
    (async () => {
      try {
        setIsLoding(true);
        const res = await api.get("/api/getproduct");
        setData(res.data.data);
        setIsLoding(false);
      } catch (error) {
        setIsLoding(false);
        toast.error(error.response.data?.message);
      }
    })()
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  return (
    <div className='w-full h-screen bg-gray-200 flex items-center justify-center flex-col relative'>
      {
        isLoading && <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8] fixed z-30" />
      }
        <div className='w-full px-[4%] h-16 flex justify-between items-center'>
            
            <img src={icon} alt="Icon" 
              className='w-16 h-16 rounded-full'
            />
            
            <Link to="/create"
                className="px-4 h-11 py-2 bg-[#3B9DF8] text-white text-[1.1rem] rounded-full flex items-center gap-[10px] hover:bg-sky-500 duration-150 cursor-pointer">
                <FaPlus className="text-[1.1rem]"/> Create
            </Link>
        </div>
      <div className='w-[95%] h-[95%] bg-gray-100 rounded-2xl p-5 overflow-y-auto flex justify-center flex-wrap gap-5'>
        {
          data.map((e, i) => {
            return <Card data={e} key={e._id} i={i} />
          })
        }
      </div>
      <button className='absolute bottom-0 left-4 p-2 bg-sky-500 text-white rounded-xl hover:bg-sky-400 cursor-pointer' onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Home
