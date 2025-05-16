
import { useEffect, useState } from "react";

import { getSongById } from "@/services/songs/getSongById.service";
import { Song } from "@/types/SongsTypesProps";
import { SongFormState } from "../../components/Modal/types";


export const useSongFormData = (
  isOpen: boolean,
  songToEdit?: Song | null
) => {
  const [form, setForm] = useState<SongFormState>({
    name: "",
    linkSong: "",
    category: "",
    fileSong: null,
    fileScore: null,
  });

  const [initialForm, setInitialForm] = useState<SongFormState | null>(null);

  useEffect(() => {
    const fetchSongDetails = async () => {
      if (!songToEdit?._id) return;

      try {
        const songData = await getSongById(songToEdit._id);

        const updatedForm = {
          name: songData.name,
          linkSong: songData.linkSong,
          category: songData.category,
          fileSong: null,
          fileScore: null,
        };

        setForm(updatedForm);
        setInitialForm(updatedForm);
      } catch (err) {
        console.error("Error fetching song by ID", err);
      }
    };

    if (isOpen && songToEdit?._id) {
      fetchSongDetails();
    }
  }, [isOpen, songToEdit]);

  useEffect(() => {
    if (isOpen && !songToEdit) {
      setForm({
        name: "",
        linkSong: "",
        category: "",
        fileSong: null,
        fileScore: null,
      });
      setInitialForm(null);
    }
  }, [isOpen, songToEdit]);

  const isFormModified = (): boolean => {
    if (!initialForm) return false;

    return (
      form.name !== initialForm.name ||
      form.linkSong !== initialForm.linkSong ||
      form.category !== initialForm.category ||
      form.fileSong !== null ||
      form.fileScore !== null
    );
  };

  return {
    form,
    setForm,
    initialForm,
    isFormModified,
  };
};
