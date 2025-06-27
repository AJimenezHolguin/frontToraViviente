import { Playlist } from "@/types/PlaylistsTypesProps";

export interface UseRenderPlaylistsCellProps {
    onEdit?: (playlist: Playlist) => void;
    onDelete?: (playlist: Playlist) => void;
  }
  

