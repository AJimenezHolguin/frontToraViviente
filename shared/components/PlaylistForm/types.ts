import { Song } from "@/types/SongsTypesProps";

export type PlaylistFormProps = {
  form: { name: string; songs: string[]; status: boolean };
  setForm: React.Dispatch<
    React.SetStateAction<{ name: string; songs: string[]; status: boolean }>
  >;
  responseData: Song[];
  selectedSongs: string[];
  setSelectedSongs: React.Dispatch<React.SetStateAction<string[]>>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
};
