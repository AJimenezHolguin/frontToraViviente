import axiosInstance from "@/config/axios/axiosInstance";
import { getSession } from "next-auth/react";
import { UpdatePlaylistPayload, UpdatePlaylistResponse } from "../typesServices";


export const updatePlaylist = async (
  playlistId: string,
  payload: UpdatePlaylistPayload
): Promise<UpdatePlaylistResponse> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const response = await axiosInstance.put<UpdatePlaylistResponse>(
      `/playlists/${playlistId}`,
      payload
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error al actualizar la playlist:",
      error?.response?.data || error.message
    );
    throw new Error("No se pudo actualizar la playlist");
  }
};
