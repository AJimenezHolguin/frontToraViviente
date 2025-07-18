import { uploadFileToCloudinary } from "@/services/cloudinary/uploadFileCloudinary.service";
import { deleteImage } from "@/services/cloudinary/deleteFileCloudinary.service";
import { FileData, UpdateSong } from "@/services/typesServices";
import { SongFormState } from "@/shared/components/Modal/types";
import { FileUploadResult } from "./types";

export const uploadSongFiles = async (
  form: SongFormState,
  previousFiles?: { song?: FileData | null; score?: FileData | null }
): Promise<FileUploadResult> => {
  let uploadedFileSong: FileData | null = previousFiles?.song ?? null;

  let uploadedFileScore: FileData | null = previousFiles?.score ?? null;

  try {
    if (form.fileSong) {
      if (uploadedFileSong?.public_id)
        await deleteImage(uploadedFileSong.public_id);

      const newFile = await uploadFileToCloudinary(
        form.fileSong,
        "letra_upload"
      );

      if (!newFile) throw new Error("Error al subir la letra");

      uploadedFileSong = newFile;
    }

    if (form.fileScore) {
      if (uploadedFileScore?.public_id)
        await deleteImage(uploadedFileScore.public_id);

      const newFile = await uploadFileToCloudinary(
        form.fileScore,
        "acorde_upload"
      );

      if (!newFile) throw new Error("Error al subir acordes");

      uploadedFileScore = newFile;
    }

    return { fileSong: uploadedFileSong, fileScore: uploadedFileScore };
  } catch (err) {
    // Limpieza si falla
    if (
      form.fileSong &&
      uploadedFileSong?.public_id !== previousFiles?.song &&
      uploadedFileSong?.public_id
    ) {
      await deleteImage(uploadedFileSong.public_id);
    }

    if (
      form.fileScore &&
      uploadedFileScore?.public_id !== previousFiles?.score &&
      uploadedFileScore?.public_id
    ) {
      await deleteImage(uploadedFileScore.public_id);
    }

    throw err;
  }
};

export const buildSongPayload = (
  form: SongFormState,
  files: FileUploadResult,
  previousFiles: { fileSong?: FileData | null; fileScore?: FileData | null }
): UpdateSong => {
  return {
    name: form.name,
    linkSong: form.linkSong,
    category: form.category,
    fileSong: files.fileSong ?? previousFiles.fileSong ?? null,
    fileScore: files.fileScore ?? previousFiles.fileScore ?? null,
  };
};
