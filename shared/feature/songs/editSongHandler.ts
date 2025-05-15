import { updateSong } from "@/services/songs/updateSong.service";
import { SongFormState } from "@/shared/components/Modal/types";
import { SOngInfo } from "@/services/typesServices";
import { buildSongPayload, uploadSongFiles } from "./utils/uploadSongFiles";

export const editSongHandler = async (
  form: SongFormState,
  songEdit: SOngInfo
): Promise<{ message: string }> => {
  try {
    const files = await uploadSongFiles(form, {
      song: songEdit.fileSongPublicId,
      score: songEdit.fileScorePublicId,
    });

    const payload = buildSongPayload(form, files);

    await updateSong(songEdit._id, payload);

    return { message: "¡Canción actualizada correctamente!" };
  } catch (error) {
    throw error;
  }
};
