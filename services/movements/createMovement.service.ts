import { getSession } from "next-auth/react";
import axiosInstance from "@/config/axios/axiosInstance";
import {
  CreateMovementRequest,
  CreateMovementResponse,
} from "../typesServices";

export const createMovement = async (
  data: CreateMovementRequest
): Promise<CreateMovementResponse> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const response = await axiosInstance.post<CreateMovementResponse>(
      "/movements/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating movement:",
      error?.response?.data || error.message
    );
    throw new Error("No se pudo crear el asiento contable");
  }
};
