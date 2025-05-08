// services/song.service.ts
import { API_URL } from "@/config/axios/constanst";
import { Song } from "@/types/SongsTypesProps";
import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: API_URL,
});

export const getMySongs = async (): Promise<Song[]> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.id || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const userId = session.user.id;
    const token = session.user.token;

    const response = await api.get(`/songs/mysongs/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data.map((song:Song) => ({
      _id: song._id,
      name: song.name,
      user: song.user,
      linkSong: song.linkSong,
      category: song.category,
      fileSong: song.fileSong,
      fileScore: song.fileScore,
    }));
  } catch (error: any) {
    console.error("Error fetching songs:", error?.response?.data || error.message);
    throw Error("No se pudieron obtener las canciones");
  }
};
