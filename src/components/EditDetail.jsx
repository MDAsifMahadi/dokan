import icon from "../assets/dokan.png";
import {FiLoader, FiUpload} from "react-icons/fi";
import { IoSaveOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from "../utility/api";
import MassContext from "../contexts/MessContext";
import imgUploader from "../utility/imgUploader";
import uploadImg from "../assets/loading.gif";

const EditDetail = () => {
    const [title, setTitle] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [imgInfo, setImgInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {id} = useParams();
    const toast = useContext(MassContext);
    const navigate = useNavigate();
    const [isUpload, setIsUpload] = useState(false);

    const updateImgInfo = (public_id) => {
        const imgList = imgInfo.filter(img => img.public_id !== public_id);
        setImgInfo(imgList);
    }

    useEffect(()=> {
        (async () => {
          try {
            const res = await api.get(`/api/getoneproduct/${id}`);
            setTitle(res.data.data.title);
            setProductDetails(res.data.data.productDetails)
            setAdditionalInfo(res.data.data.additionalInfo)
            const images = res.data.data.imageURL
            setImgInfo(images);
          } catch (error) {
            
            toast.error(error.response.data?.message);
          }
        })()
    }, [id]);

    const handleUploadImage = () => {
        document.getElementById("image_input").click();
    };

   const handleFileChange = async (e) => {
             e.preventDefault();
            const files = Array.from(e.target.files);
            for(let img of files ){
            const formData = new FormData();
            formData.append("photo", img);
            const {url, public_id} = await imgUploader(formData, setIsUpload);
            setImgInfo(pre => [...pre, {url, public_id}]);
        };
    };


    // todo
    const handleSave = async () => {
        setIsLoading(true);
        try {
            const data = {
                title,
                productDetails,
                additionalInfo,
                imgInfo
            }
            const res = await api.post(`/api/editproduct/${id}`, data);
            toast.success(res.data.message);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDeleteImage = async (e) => {
        if(confirm("Do you want to delete the image ?")) {
            try {
                setIsUpload(true)
                await api.delete(`/api/imgdeleter/${e.public_id}`);
                updateImgInfo(e.public_id);
                setIsUpload(false)
            } catch (error) {
                console.log(error)
                setIsUpload(false)
            }

        }
    }

    const handleDelete = async () => {
        try {
            const res = await api.delete(`/api/deleteproduct/${id}`);
            toast.success(res.data.message);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

  return (
    <div className='w-full h-screen bg-gray-200 flex items-center justify-center flex-col'>

        <div className='w-full px-[4%] h-16 flex justify-between items-center'>
                    <Link to="/">
                        <img src={icon} alt="Icon" 
                        className='w-16 h-16 rounded-full'
                        />
                    </Link>
                    <div className="flex items-center">
                       
                        <button
                            className="px-4 mr-2 h-11 py-2 bg-red-700 text-white text-[1.1rem] rounded-full flex items-center gap-[10px] hover:bg-red-600 duration-150 cursor-pointer"
                            disabled={isLoading}
                            onClick={handleDelete}
                        >
                            <MdDeleteOutline className="text-[1.5rem]"/> Delete
                        </button>
                        
                     
                        <button
                            className="px-4 h-11 py-2 bg-[#3B9DF8] text-white text-[1.1rem] rounded-full flex items-center gap-[10px] hover:bg-sky-500 duration-150 cursor-pointer"
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            <IoSaveOutline className="text-[1.1rem]"/> Save
                        </button>
                            
                    </div>
                </div>

        <div className='w-[95%] h-[95%] bg-gray-100 rounded-2xl p-5 overflow-y-auto'>
            
            <section className=" bg-gray-200 rounded-2xl">    
                <div className="flex flex-col md:flex-row p-2 relative">

              {
                isLoading && <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8] absolute top-3 right-3" />
              }

                    <div className="flex-1/2 h-[500px] overflow-auto rounded-lg flex justify-center items-center flex-col">

                        <div className="w-full flex gap-2 flex-wrap justify-center">
                            {
                                imgInfo.map((e) => <span className="relative" key={Math.random()}>
                                                    <img
                                                        className="w-40"
                                                        src={e.url} 
                                                        alt="Product Image"/>
                                                    <button onClick={()=>handleDeleteImage(e)}className="text-3xl absolute top-0 right-0 bg-[#E55050] rounded-xl text-[#E7F2E4]">
                                                        <MdDeleteOutline />
                                                    </button>
                                                </span>
                                        )
                            }
                        </div>

                        <div className=" flex items-center flex-col gap-5 justify-center relative">
                            <input
                                type="file"
                                name="image"
                                id="image_input"
                                className="hidden"
                                onChange={handleFileChange}
                                multiple
                            />

                                <div
                                    className="w-full md:w-[90%] flex items-center justify-center flex-col gap-4 border-[#e5eaf2] border rounded-md py-6 cursor-pointer"
                                    onClick={handleUploadImage}
                                >
                                    <FiUpload className="text-[2rem] text-[#777777]"/>
                                    <p className="text-[#777777]">Browse to upload you file</p>
                                </div>

                            {
                                isUpload && <img
                                className="w-40 absolute bottom-0 z-10"
                                src={uploadImg} 
                                alt="Product Image"/>
                            }  
                        </div>
                    

                    </div>
                    <div className="flex-1/2 p-5 md:p-10 overflow-y-auto">
                        <h2 className="text-2xl font-black mb-5">Product Details</h2>
                        <input
                            className="w-full border border-black-300 p-2 rounded-xl mb-2"
                            placeholder="Write a title."
                        type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
                        <textarea 
                            className="w-full min-h-60 border border-black-300 p-2 rounded-xl"
                            onChange={e => setProductDetails(e.target.value)}
                            value={productDetails}
                        ></textarea>
                    </div>
                </div>
                <div className="mt-5 p-7">
                    <h2 className="text-2xl font-black mb-5">Additional Information</h2>
                    <textarea 
                        className="w-full min-h-60 border border-black-300 p-2 rounded-xl"
                        onChange={e => setAdditionalInfo(e.target.value)}
                        value={additionalInfo}
                    ></textarea>
                </div>
            </section>
        </div>
    </div>
  )
}

export default EditDetail
