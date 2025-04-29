import { API_URL } from "@/config/axios/constanst";
import { Song } from "@/shared/components/table/types";
import axios from "axios";


const api = axios.create({
    baseURL: API_URL,
});

export const getAllSongs = async (): Promise<Song[]> => {
    try {
        const response = await api.get<{success: boolean, count: number, data: Song[]}>("/songs");

        const songsResponse = response.data.data;
 
        return songsResponse.map((song => ({
        _id: song._id,
        name: song.name,
        user: song.user,
        linkSong: song.linkSong,
        category: song.category,
        fileSong: song.fileSong,
        fileScore: song.fileScore,
        }))
        );
        
    } catch (error) {
        console.error("Error fetching songs:", error);
        throw Error("No se pudieron obtener las canciones");
    }
}