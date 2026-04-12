import { getSession } from "next-auth/react";
import axiosInstance from "@/config/axios/axiosInstance";

export const annulledMovement = async (
  movementId: string,
  description: string
) => {
  try {
    const session = await getSession();

    if (!session || !session.user.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const token = session.user.token;

    await axiosInstance.patch(
      `/movements/anulled/${movementId}`,
      { description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error:any) {
    if(error.response){
      throw error.response.data
    }
    throw error;
  }
};
