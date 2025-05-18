import { useState } from "react";
import { LuDownload } from "react-icons/lu";
const Image = ({src, className, info="Product Image"}) => {
    const [button, setButton] = useState(false);
    const getDownloadLink = (url) => {
        const parts = url.split("/upload/");
        return parts[0] + "/upload/fl_attachment/" + parts[1];
    };

  return (
    <span className="relative overflow-hidden group"
        onMouseEnter={()=> setButton(true)}
        onMouseLeave={()=> setButton(false)}
        onClick={()=> setButton(true)}
    >
        <img src={src} alt={info}  className={className}/>
        <a download href={getDownloadLink(src)} className={`absolute top-0 left-0 backdrop-blur-sm w-full h-full rounded-2xl flex flex-col items-center justify-center cursor-pointer transform ${button ? "translate-y-0" : "translate-y-full"} duration-300`}>
            <LuDownload className="text-5xl text-white"/>
            <p className="text-lg font-medium text-white">Download</p>
        </a>
    </span>
  )
}

export default Image
