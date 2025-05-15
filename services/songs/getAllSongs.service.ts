import axiosInstance from "@/config/axios/axiosInstance";

import { Song } from "@/types/SongsTypesProps";

export const getAllSongs = async (): Promise<Song[]> => {
  try {
    const response = await axiosInstance.get<{
      success: boolean;
      count: number;
      data: Song[];
    }>("/songs");

    const songsResponse = response.data.data;

    return songsResponse.map((song) => ({
      _id: song._id,
      name: song.name,
      user: song.user,
      linkSong: song.linkSong,
      category: song.category,
      fileSong: song.fileSong,
      fileScore: song.fileScore,
    }));
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw Error("No se pudieron obtener las canciones");
  }
};
