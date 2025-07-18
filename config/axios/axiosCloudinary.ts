import axios from "axios";

const currentEnv = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const axiosCloudinary = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/${currentEnv}`,
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export default axiosCloudinary;