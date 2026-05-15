import { getSession } from "next-auth/react";
import { GetAllUsersResponse, PaginationParamsProps } from "../typesServices";
import { DEFAULT_PAGINATION } from "../defaultPagination";
import axiosInstance from "@/config/axios/axiosInstance";

export const getAllUsers = async (
  params: PaginationParamsProps
): Promise<GetAllUsersResponse> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const finalParams = { DEFAULT_PAGINATION, ...params };

    const response = await axiosInstance.get<GetAllUsersResponse>(
      "/admin/users",
      {
        params: finalParams,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  throw new Error("No se pudieron obtener los usuarios");
};
