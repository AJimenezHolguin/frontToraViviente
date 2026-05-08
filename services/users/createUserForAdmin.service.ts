import axiosInstance from "@/config/axios/axiosInstance";
import { RegisterAdminPayload, RegisterAdminResponse } from "./types";

export const createUserForAdmin = async (
  payload: RegisterAdminPayload
): Promise<RegisterAdminResponse> => {
  try {

    const { data } =
      await axiosInstance.post<RegisterAdminResponse>(
        "/auth/register-admin",
        payload
      );

    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Error al crear usuario"
    );
  }
};