import { useEffect, useState } from "react";
import { PlaylistFormState } from "./types"; // tu ruta real
import { Playlist } from "@/types/PlaylistsTypesProps";
import { getPlaylistById } from "@/services/playlists/getPlaylistById.service"; // crea este servicio si no existe

export const usePlaylistFormData = (
  isOpen: boolean,
  playlistToEdit?: Playlist | null
) => {
  const [form, setForm] = useState<PlaylistFormState>({
    name: "",
    songs: [],
    status: true,
  });

  const [initialForm, setInitialForm] = useState<PlaylistFormState | null>(null);

  // Carga la playlist si se va a editar
  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!playlistToEdit?._id) return;

      try {
        const playlistData = await getPlaylistById(playlistToEdit._id);
       

        const updatedForm: PlaylistFormState = {
          name: playlistData.name,
          songs: Array.isArray(playlistData.songs)
          ? playlistData.songs.map((song) => song._id)
          : [],
          status: playlistData.status,
        };

        setForm(updatedForm);
        setInitialForm(updatedForm);
      } catch (error) {
        console.error("Error al obtener los datos de la playlist:", error);
      }
    };

    if (isOpen && playlistToEdit?._id) {
      fetchPlaylistDetails();
    }
  }, [isOpen, playlistToEdit]);

  // Resetea el formulario si es una nueva playlist
  useEffect(() => {
    if (isOpen && !playlistToEdit) {
      setForm({
        name: "",
        songs: [],
        status: true,
      });
      setInitialForm(null);
    }
  }, [isOpen, playlistToEdit]);

  // Verifica si el formulario fue modificado
  const isFormModified = (): boolean => {
    if (!initialForm) return false;

    return (
      form.name !== initialForm.name ||
      form.status !== initialForm.status ||
      JSON.stringify(form.songs) !== JSON.stringify(initialForm.songs)
    );
  };

  return {
    form,
    setForm,
    initialForm,
    isFormModified,
  };
};
