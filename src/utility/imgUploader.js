import api from "./api"

const imgUploader = async (formData, setIsUpload) => {
    try {
        setIsUpload(true);
        const res = await api.post("/api/imguploader", formData);
        const {data} = res.data;
        setIsUpload(false)
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default imgUploader;