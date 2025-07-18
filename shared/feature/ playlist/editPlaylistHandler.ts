import { PlaylistFormState } from "../../hooks/playlists/types";
import axiosInstance from "../../../config/axios/axiosInstance";
import { Playlist } from "../../../types/PlaylistsTypesProps";

export const editPlaylistHandler = async (
  form: PlaylistFormState,
  playlistToEdit: Playlist
) => {
  const payload = {
    name: form.name.trim(),
    songs: form.songs,
    status: form.status,
  };

  const { data } = await axiosInstance.put(
    `/playlists/${playlistToEdit._id}`,
    payload
  );

  return data;
};
