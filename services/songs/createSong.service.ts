import { getSession } from "next-auth/react";
import { UpdateSong } from "../typesServices";
import axiosInstance from "@/config/axios/axiosInstance";

export const createSong = async ( data: UpdateSong) => {
  try {
    const session = await getSession();

    const response = await axiosInstance.post("/songs/create", data, {
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
