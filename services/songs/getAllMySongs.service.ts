import axiosInstance from "@/config/axios/axiosInstance";
import { getSession } from "next-auth/react";
import {
  GetAllMySongsResponse,
  GetAllSongsParamsProps,
} from "../typesServices";
import { DEFAULT_PAGINATION } from "../defaultPagination";

export const getAllMySongs = async (
  params: GetAllSongsParamsProps
): Promise<GetAllMySongsResponse> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const finalParams = { ...DEFAULT_PAGINATION, ...params };

    const response = await axiosInstance.get<GetAllMySongsResponse>(
      "/songs/user",
      {
        params: finalParams,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching songs:",
      error?.response?.data || error.message
    );
    throw new Error("No se pudieron obtener las canciones");
  }
};
