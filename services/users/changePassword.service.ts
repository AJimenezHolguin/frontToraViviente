import { getSession } from "next-auth/react";
import { ChangePasswordParams } from "./types";
import axiosInstance from "@/config/axios/axiosInstance";

export const changePassword = async (payload: ChangePasswordParams) => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const token = session.user.token;

    const response = await axiosInstance.put("/auth/change-password", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw new Error("No se pudo cambiar la contraseña");
  }
};
