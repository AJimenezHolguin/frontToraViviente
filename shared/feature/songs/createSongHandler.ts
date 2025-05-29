import { SongFormState } from "@/shared/components/Modal/types";
import { createSong } from "@/services/songs/createSong.service";
import { buildSongPayload, uploadSongFiles } from "./utils/uploadSongFiles";

export const createSongHandler = async (
  form: SongFormState,
  userId: string
): Promise<{ message: string }> => {
  try {
    const files = await uploadSongFiles(form);

    if (!files.fileSong || !files.fileScore) {
      throw new Error("Faltan archivos necesarios para guardar la canción");
    }

    const payload = buildSongPayload(form, files, {
      fileSong: files.fileSong,
      fileScore: files.fileScore,
    });

    await createSong(payload);

    return { message: "¡La canción fue creada exitosamente!" };
  } catch (error) {
    throw error;
  }
};
