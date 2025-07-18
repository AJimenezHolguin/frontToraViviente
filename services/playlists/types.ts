
export interface CreatePlaylistProps {
    name: string;
    songs: string[];
    status: boolean
}

export interface DeletePlaylistProps {
    _id: string;
}