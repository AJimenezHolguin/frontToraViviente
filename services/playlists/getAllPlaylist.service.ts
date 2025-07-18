import axiosInstance from "@/config/axios/axiosInstance";
import { getSession } from "next-auth/react";
import {
    GetAllMyPlaylistsResponse,
  PaginationParamsProps,
} from "../typesServices";
import { DEFAULT_PAGINATION } from "../defaultPagination";

export const getAllPlaylist = async (
  params: PaginationParamsProps
): Promise<GetAllMyPlaylistsResponse> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const finalParams = { ...DEFAULT_PAGINATION, ...params };

    const response = await axiosInstance.get<GetAllMyPlaylistsResponse>(
      "/playlists",
      {
        params: finalParams,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching all playlists:",
      error?.response?.data || error.message
    );
    throw new Error("No se pudieron obtener todas las playlists");
  }
};
