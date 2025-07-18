import { getSession } from "next-auth/react";
import { DeletePlaylistProps } from "./types";
import axiosInstance from "@/config/axios/axiosInstance";


export const deletePlaylist = async(playlistId:DeletePlaylistProps) => {
 try {
    const session = await getSession()
   
    if(!session || !session.user.token) {
        throw new Error("Sesión no válida o token faltante")
    }
    const token = session.user.token;

    await axiosInstance.delete(`/playlists/${playlistId._id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
 } catch (error) {
    console.error("Error al eliminar la playlist:", error);
    throw new Error("Fallo al eliminar la playlist");
 }
}