import { getSession } from "next-auth/react";
import { SOngInfo } from "../typesServices";
import { deleteImage } from "../cloudinary/deleteFileCloudinary.service";
import axiosInstance from "@/config/axios/axiosInstance";

export const deleteSong = async (idSong: SOngInfo) => {
  try {
    const session = await getSession();

    if (!session || !session.user.token) {
      throw new Error("Sesión no válida o token faltante");
    }

    const token = session.user.token;

    await deleteImage(idSong.fileScorePublicId);
    await deleteImage(idSong.fileSongPublicId);

    await axiosInstance.delete(`/songs/${idSong._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error al eliminar la canción y sus archivos:", error);
    throw new Error("Fallo al eliminar la canción");
  }
};
