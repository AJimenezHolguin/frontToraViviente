import { deletePlaylist } from "@/services/playlists/deletePlaylist.service";
import { AlertType } from "@/shared/components/Modal/types";
import { Playlist } from "@/types/PlaylistsTypesProps";
import { useState } from "react";

export const useDeletePlaylist = (
  showAlert: (type: AlertType, message: string) => void
) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (playlist: Playlist) => {
    try {
      setLoading(true);
      await deletePlaylist({
        _id: playlist._id,
      });

      showAlert("success", "Playlist eliminada correctamente!");
    } catch (error) {
      console.error(error);
      showAlert("error", "Error al eliminar la playlist!");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading };
};
