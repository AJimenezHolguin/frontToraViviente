import { PlaylistFormState } from "@/shared/hooks/playlists/types";
import { Playlist } from "@/types/PlaylistsTypesProps";

export type SavePlaylistProps = {
    form: PlaylistFormState;
    playlistToEdit?: Playlist | null;
    userId: string;
}