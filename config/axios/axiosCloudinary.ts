import axios from "axios";


const axiosCloudinary = axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/dks7wxcny",
    headers: {}
});

export default axiosCloudinary;