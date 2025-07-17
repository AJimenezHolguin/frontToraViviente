
import axiosInstance from "@/config/axios/axiosInstance";
import { PlaylistFormState } from "@/shared/hooks/playlists/types";

export const createPlaylistHandler = async (
  form: PlaylistFormState,
  userId: string
) => {
  const payload = {
    name: form.name.trim(),
    songs: form.songs,
    status: form.status,
   
  };

  const { data } = await axiosInstance.post("/playlists", payload);
  
  return data;
};
