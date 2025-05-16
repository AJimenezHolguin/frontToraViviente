import { SongFormState } from "@/shared/components/Modal/types";
import { Song } from "@/types/SongsTypesProps";

export type SaveSongProps = {
    form: SongFormState;
    songToEdit?: Song | null;
    userId: string;
  };
  