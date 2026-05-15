import axiosInstance from "@/config/axios/axiosInstance";
import { ResetPasswordForAdmin, ResetPasswordForAdminResponse } from "./types";


  export const resetPasswordForAdmin = async (
    user: ResetPasswordForAdmin
  ): Promise<ResetPasswordForAdminResponse> => {
    try {
      const response =
        await axiosInstance.put<ResetPasswordForAdminResponse>(
          "/admin/users/reset-password",
          user
        );
  
      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message ||
          "Error al reasignar contraseña"
      );
    }
  };