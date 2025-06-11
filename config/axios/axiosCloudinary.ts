import axios from "axios";

const currentEnv = "dks7wxcny"

const axiosCloudinary = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/${currentEnv}`,
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export default axiosCloudinary;