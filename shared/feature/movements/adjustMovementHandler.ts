import axiosInstance from "@/config/axios/axiosInstance";
import { getSession } from "next-auth/react";
import { CreateMovementRequest, CreateMovementResponse } from "@/services/typesServices";

export const adjustMovementHandler = async (
  id: string,
  form: CreateMovementRequest
): Promise<CreateMovementResponse> => {
  try {
    const session = await getSession();

    if (!session?.user?.token) {
      throw new Error("Sesión no válida");
    }

    const response = await axiosInstance.put<CreateMovementResponse>(
      `/movements/adjust/${id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adjust movement:", error);
    throw new Error("No se pudo ajustar el asiento contable");
  }
};