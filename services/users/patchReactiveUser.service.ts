
import axiosInstance from "@/config/axios/axiosInstance";
import axios from "axios";
import { ReactiveAndInactiveUserResponse } from "./types";

export const reactivateUser = async (
    userId: string
  ): Promise<ReactiveAndInactiveUserResponse> => {
    try {
      const response = await axiosInstance.patch<ReactiveAndInactiveUserResponse>(
        `/admin/users/${userId}/reactivate`
      );
  
      return response.data;
    } catch (error) {
      console.error("Error reactivando usuario:", error);
  
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "No se pudo reactivar el usuario"
        );
      }
  
      throw new Error("Error inesperado");
    }
  };