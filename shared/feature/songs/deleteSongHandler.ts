
import { deleteSong } from "@/services/songs/deleteSong.service";
import { Song } from "@/types/SongsTypesProps";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { useState } from "react";
import { AlertType } from "@/shared/components/Modal/types";


export const useDeleteSong = (showAlert:(type: AlertType, message: string) => void ) => {
  const [loading, setLoading] = useState(false);
  

  const handleDelete = async (song: Song) => {
    try {
      setLoading(true);
      await deleteSong({
        _id: song._id,
        fileSongPublicId: song.fileSong.public_id,
        fileScorePublicId: song.fileScore.public_id,
      });

      showAlert("success", "Canción eliminada correctamente!");
    } catch (err) {
      console.error(err);
      showAlert("error", "Error al eliminar la canción!");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading };
};
