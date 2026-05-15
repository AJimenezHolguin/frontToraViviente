import axiosInstance from "@/config/axios/axiosInstance";
import { RegisterPublicPayload, RegisterPublicResponse } from "./types";

export const registerUserPublic = async (
  payload: RegisterPublicPayload
): Promise<RegisterPublicResponse> => {
  try {
    const { data } =
      await axiosInstance.post<RegisterPublicResponse>(
        "/auth/register-public",
        payload
      );

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Error al registrar usuario"
    );
  }
};

