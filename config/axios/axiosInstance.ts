import axios from "axios";

import { API_URL, DEFAULT_HEADERS } from "./constanst";
import applyInterceptors from "./axiosInterceptors";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: DEFAULT_HEADERS,
});


applyInterceptors(axiosInstance);

export default axiosInstance;