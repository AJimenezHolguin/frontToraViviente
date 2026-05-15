import { ReactiveAndInactiveUserResponse } from "./types";
import axiosInstance from "@/config/axios/axiosInstance";
import axios from "axios";

export const desactiveUser = async (
    userId: string
  ): Promise<ReactiveAndInactiveUserResponse> => {
    try {
      const response = await axiosInstance.delete<ReactiveAndInactiveUserResponse>(
        `/admin/users/${userId}`
      );
  
      return response.data;
    } catch (error) {
      console.error("Error al desactivar el usuario:", error);
  
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "No se pudo desactivar el usuario"
        );
      }
  
      throw new Error("Error inesperado");
    }
  };