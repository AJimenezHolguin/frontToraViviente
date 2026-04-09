import { getSession } from "next-auth/react";
import axiosInstance from "@/config/axios/axiosInstance";

export const annulledMovement = async (
  movementId: string,
  movementDescription: string
) => {
  try {
    const session = await getSession();

    if (!session || !session.user.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const token = session.user.token;

    await axiosInstance.patch(
      `/movements/anulled/${movementId}`,
      { movementDescription },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error al eliminar el registro contable:", error);
    throw Error("Fallo al eliminar el Registro contable");
  }
};
