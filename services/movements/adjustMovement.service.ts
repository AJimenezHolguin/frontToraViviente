import { getSession } from "next-auth/react";
import axiosInstance from "@/config/axios/axiosInstance";

import { Movements } from "@/types/movementsTypesProps";
import {
  AdjustMovementRequest,
  ApiResponse,
  
} from "../typesServices";

export const adjustMovement = async (
  movementId: string,
  data: AdjustMovementRequest
): Promise<ApiResponse<Movements>> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const response = await axiosInstance.post<ApiResponse<Movements>>(`/movements/adjust/${movementId}`, data, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
