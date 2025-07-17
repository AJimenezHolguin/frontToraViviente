import { Playlist } from "@/types/PlaylistsTypesProps";
import { PlaylistFormState } from "./types";
import { useEffect, useState } from "react";


export const useFormValidationPlaylist = (
    form : PlaylistFormState,
    initialForm: PlaylistFormState | null,
    playlistToEdit: Playlist | null
) => {
    const [isFormValid, setIsFormValid] = useState(false);

    const isFomrModified = () => {
        if(!initialForm) return false;

        return (
            form.name !== initialForm.name ||
            form.songs.length !== initialForm.songs.length ||
            JSON.stringify(form.status) !== JSON.stringify(initialForm.status)
        )
            
    }

    useEffect(() => {
        if(playlistToEdit) {
            setIsFormValid(isFomrModified());
        } else {
            const { name, songs, status } = form;
            
            setIsFormValid(
                !!name && songs.length > 0 && typeof status === 'boolean'
            );
        }
    },[form, initialForm, playlistToEdit]);

    return { isFormValid };

}