import { createSongHandler } from "./createSongHandler";
import { editSongHandler } from "./editSongHandler";
import { SaveSongProps } from "./types";


export const saveSongHandler = async ({ form, songToEdit, userId }: SaveSongProps) => {
  if (!userId) {
    throw new Error("No tienes permisos para crear una canción");
  }

  if (songToEdit) {
    return await editSongHandler(form, {
      ...songToEdit,
      fileSong: songToEdit.fileSong,
      fileScore: songToEdit.fileScore,
      fileSongPublicId: songToEdit.fileSong?.public_id,
      fileScorePublicId: songToEdit.fileScore?.public_id,
    });
  }

  return await createSongHandler(form, userId);
};
