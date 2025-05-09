import { getSession } from "next-auth/react";
import { UpdateSongDto } from "../typesServices";
import axiosInstance from "@/config/axios/axiosInstance";

export const createSong = async (idUser: string, data: UpdateSongDto) => {
  try {
    const session = await getSession();

    const response = await axiosInstance.post(`/songs/create/${idUser}`, data, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error create song:", error);
    throw Error("No se pudo crear la canción");
  }
};
