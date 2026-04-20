import { getSession } from "next-auth/react";
import axiosInstance from "@/config/axios/axiosInstance";
import { CreatePlaylistProps } from "./types";


export const CreatePlaylist = async(data:CreatePlaylistProps) => {
    try {
        const session = await getSession();

        const response = await axiosInstance.post("/playlists", data, {
            headers: {
                Authorization: `Bearer ${session?.user.token}`,
            },
        })
       
        return response.data
    } catch (error) {
        console.error("Error create playlist:", error);
        throw Error("No se pudo crear la playlist");
    }

}