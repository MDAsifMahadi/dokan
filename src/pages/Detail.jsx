import api from "../utility/api";
import icon from "../assets/dokan.png";
import { FaRegEdit } from "react-icons/fa";
import DynamicImageGrid from "../components/DynamicImageGrid";
import { Link, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import MassContext from "../contexts/MessContext";
import { FiLoader } from "react-icons/fi";

const Detail = () => {
    const {id} = useParams();

    const [data, setData] = useState({});
    const [isLoading, setIsLoding] = useState(false);
    const toast = useContext(MassContext);

    useEffect(()=> {
        (async () => {
          try {
            setIsLoding(true);
            const res = await api.get(`/api/getoneproduct/${id}`);
            setData(res.data.data);
            setIsLoding(false);
          } catch (error) {
            setIsLoding(false);
            toast.error(error.response.data?.message);
          }
        })()
    }, [id]);

    
    const images = data.imageURL?.map((e) => {
        return e.url;
    })
    
  return (
    <div className='w-full h-screen bg-gray-200 flex items-center justify-center flex-col'>

        <div className='w-full px-[4%] h-16 flex justify-between items-center'>
                    <Link to="/">
                        <img src={icon} alt="Icon" 
                        className='w-16 h-16 rounded-full'
                        />
                    </Link>
                    <Link to={`/edit/${id}`}
                        className="px-4 h-11 py-2 bg-[#3B9DF8] text-white text-[1.1rem] rounded-full flex items-center gap-[10px] hover:bg-sky-500 duration-150 cursor-pointer">
                        <FaRegEdit className="text-[1.1rem]"/> Edit
                    </Link>
                </div>

        <div className='w-[95%] h-[95%] bg-gray-100 rounded-2xl p-5 overflow-y-auto'>
            
            <section className=" bg-gray-200 rounded-2xl relative">

                {
                    isLoading && <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8] absolute top-3 right-3" />
                }

                <div className="flex flex-col md:flex-row p-2">
                    <DynamicImageGrid images={images}/>
                    <div className="flex-1/2 p-5 md:p-10 overflow-y-auto">
                        <h2 className="text-2xl font-black mb-5">Product Details</h2>
                        <p className="text-justify max-w-[480px]">{data.productDetails}</p>
                    </div>
                </div>
                <div className="mt-5 p-7">
                    <h2 className="text-2xl font-black mb-5">Additional Information</h2>
                    <p className="text-justify">{data.additionalInfo}</p>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Detail
