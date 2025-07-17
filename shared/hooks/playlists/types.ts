import { Playlist } from "@/types/PlaylistsTypesProps";

export interface UseRenderPlaylistsCellProps {
    onEdit?: (playlist: Playlist) => void;
    onDelete?: (playlist: Playlist) => void;
  }
  
  export interface PlaylistFormState {
    name: string;
    songs: string[];
    status: boolean
  }



