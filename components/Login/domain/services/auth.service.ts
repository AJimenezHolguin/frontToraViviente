import { RequetsLogin, ResponseLogin } from "../models/user";

import axiosInstance from "@/config/axios/axiosInstance";

export const loginUser = {
  login: async (credentials: RequetsLogin): Promise<ResponseLogin> => {
    try {
      const { data } = await axiosInstance.post<ResponseLogin>(
        "/auth/login",
        credentials
      );

      return data;
    } catch (error: any) {
      error;
      throw new Error(
        error.response?.data?.message || "Error en la autenticación"
      );
    }
  },
};
