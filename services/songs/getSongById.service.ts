
import axiosInstance from "@/config/axios/axiosInstance";
import { Song } from "@/types/SongsTypesProps";

export const getSongById = async (id: string): Promise<Song> => {
  const response = await axiosInstance.get(`/songs/${id}`);
  
  return response.data.data;
};