import { createPlaylistHandler } from "./createPlaylistHandler";
import { editPlaylistHandler } from "./editPlaylistHandler";
import { SavePlaylistProps } from "./types";

export const savePlaylistHandler = async ({
  form,
  playlistToEdit,
  userId,
}: SavePlaylistProps) => {
  if (!userId) {
    throw new Error("No tienes permisos para crear una playlist");
  }

  if (playlistToEdit) {
    return await editPlaylistHandler(form, playlistToEdit);
  }

  return await createPlaylistHandler(form, userId);
};
