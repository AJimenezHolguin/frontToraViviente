import axios from "axios";

import { API_URL, DEFAULT_HEADERS } from "./constanst";
import applyInterceptors from "./axiosInterceptors";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: DEFAULT_HEADERS,
});

// Aplicamos los interceptores desde un archivo separado
applyInterceptors(axiosInstance);

export default axiosInstance;