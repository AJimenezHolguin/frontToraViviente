import { useEffect, useState } from "react";
import { SongFormState } from "../../components/Modal/types";
import { Song } from "@/types/SongsTypesProps";

export const useFormValidation = (
  form: SongFormState,
  initialForm: SongFormState | null,
  songToEdit?: Song | null
) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const isFormModified = () => {
    if (!initialForm) return false;

    return (
      form.name !== initialForm.name ||
      form.linkSong !== initialForm.linkSong ||
      form.category !== initialForm.category ||
      form.fileSong !== null ||
      form.fileScore !== null
    );
  };

  useEffect(() => {
    if (songToEdit) {
      setIsFormValid(isFormModified());
    } else {
      const { name, linkSong, category, fileSong, fileScore } = form;

      setIsFormValid(
        !!name && !!linkSong && !!category && !!fileSong && !!fileScore
      );
    }
  }, [form, initialForm, songToEdit]);

  return { isFormValid };
};
