import { getSession } from "next-auth/react";
import axiosInstance from "@/config/axios/axiosInstance";
import { ApiResponse, CreateMovementRequest, } from '@/services/typesServices';
import { Movements } from "@/types/movementsTypesProps";

export const createMovement = async (
  data: CreateMovementRequest
): Promise<ApiResponse<Movements>> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const response = await axiosInstance.post<ApiResponse<Movements>>(
      "/movements/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    return response.data;
  } catch (error:any) {
    if(error.response){
      throw error.response.data
    }
    throw error;
  }
};
