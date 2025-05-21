import { Song } from "@/types/SongsTypesProps";

export interface UseRenderSongCellProps {
  onEdit?: (song: Song) => void;
  onDelete?: (song: Song) => void;
}
