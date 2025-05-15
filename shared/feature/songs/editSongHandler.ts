import { FileData, SOngInfo } from "@/services/typesServices";
import { SongFormState } from "@/shared/components/Modal/types";
import { buildSongPayload, uploadSongFiles } from "./utils/uploadSongFiles";
import { updateSong } from "@/services/songs/updateSong.service";

export const editSongHandler = async (
  form: SongFormState,
  songEdit: SOngInfo & {
    fileSong?: FileData | null;
    fileScore?: FileData | null;
  }
): Promise<{ message: string }> => {
  try {
    const files = await uploadSongFiles(form, {
      song: songEdit.fileSong,
      score: songEdit.fileScore,
    });

    const payload = buildSongPayload(form, files, {
      fileSong: songEdit.fileSong,
      fileScore: songEdit.fileScore,
    });

    await updateSong(songEdit._id, payload);

    return { message: "¡Canción actualizada correctamente!" };
  } catch (error) {
    throw error;
  }
};
