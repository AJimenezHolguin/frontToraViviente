import axiosInstance from "@/config/axios/axiosInstance";
import { Playlist } from "@/types/PlaylistsTypesProps";


export const getPlaylistById = async (id: string): Promise<Playlist> => {
    const response = await axiosInstance.get(`/playlists/${id}`);
    
    return response.data.data
}