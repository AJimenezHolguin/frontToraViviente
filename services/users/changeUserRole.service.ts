import axiosInstance from "@/config/axios/axiosInstance";

import {
  ChangeUserRole,
  ChangeUserRoleResponse,
} from "./types";

export const changeUserRole = async (
  userData: ChangeUserRole
): Promise<ChangeUserRoleResponse> => {

  try {

    const response =
      await axiosInstance.put<ChangeUserRoleResponse>(
        "/admin/users/change-role",
        userData
      );

    return response.data;

  } catch (error: any) {

    throw new Error(
      error?.response?.data?.message ||
      "Error al cambiar el rol del usuario"
    );

  }
};