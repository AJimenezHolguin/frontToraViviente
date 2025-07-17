import { Song } from "@/types/SongsTypesProps";

export type PlaylistFormProps = {
  form: {
    name: string;
    songs: string[];
    status: boolean;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      songs: string[];
      status: boolean;
    }>
  >;
  filterValue: string;
  responseData: Song[];
  filterAllSongs: Song[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

