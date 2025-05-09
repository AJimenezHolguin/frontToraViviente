import axiosInstance from "@/config/axios/axiosInstance";

import { Song } from "@/types/SongsTypesProps";

import { getSession } from "next-auth/react";

export const getMySongs = async (): Promise<Song[]> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.id || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const userId = session.user.id;
    const token = session.user.token;

    const response = await axiosInstance.get(`/songs/mysongs/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data.map((song: Song) => ({
      _id: song._id,
      name: song.name,
      user: song.user,
      linkSong: song.linkSong,
      category: song.category,
      fileSong: song.fileSong,
      fileScore: song.fileScore,
    }));
  } catch (error: any) {
    console.error(
      "Error fetching songs:",
      error?.response?.data || error.message
    );
    throw Error("No se pudieron obtener las canciones");
  }
};
