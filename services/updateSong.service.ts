import { UpdateSongDto } from "./typesServices";

import { getSession } from "next-auth/react";
import axiosInstance from "@/config/axios/axiosInstance";

export const updateSong = async (id: string, data: UpdateSongDto) => {
  try {
    const session = await getSession();

    const response = await axiosInstance.put(`/songs/${id}`, data, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Error actualizando canción"
    );
  }
};
