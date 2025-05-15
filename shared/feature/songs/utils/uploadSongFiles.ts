import { uploadFileToCloudinary } from "@/services/cloudinary/uploadFileCloudinary.service";
import { deleteImage } from "@/services/cloudinary/deleteFileCloudinary.service";
import { FileData, UpdateSong } from "@/services/typesServices";
import { SongFormState } from "@/shared/components/Modal/types";

type FileUploadResult = {
  fileSong: FileData | null;
  fileScore: FileData | null;
};

export const uploadSongFiles = async (
  form: SongFormState,
  previousFiles?: { song?: string; score?: string }
): Promise<FileUploadResult> => {
  let uploadedFileSong: FileData | null = previousFiles?.song
    ? { public_id: previousFiles.song, secure_url: "" }
    : null;

  let uploadedFileScore: FileData | null = previousFiles?.score
    ? { public_id: previousFiles.score, secure_url: "" }
    : null;

  try {
    if (form.fileSong) {
      const newFile = await uploadFileToCloudinary(
        form.fileSong,
        "letra_upload"
      );

      if (!newFile) throw new Error("Error al subir la letra");

      if (uploadedFileSong?.public_id)
        await deleteImage(uploadedFileSong.public_id);
      uploadedFileSong = newFile;
    }

    if (form.fileScore) {
      const newFile = await uploadFileToCloudinary(
        form.fileScore,
        "acorde_upload"
      );

      if (!newFile) throw new Error("Error al subir acordes");

      if (uploadedFileScore?.public_id)
        await deleteImage(uploadedFileScore.public_id);
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
  files: FileUploadResult
): UpdateSong => {
  return {
    name: form.name,
    linkSong: form.linkSong,
    category: form.category,
    fileSong: files.fileSong,
    fileScore: files.fileScore,
  };
};
