

export interface Playlist {
    _id: string;
    name: string;
    createdBy: {
        _id: string;
        name: string;
    }
    songs: {
        _id: string;
        title: string;
        fileSong: {
            public_id: string;
            secure_url: string;
        };
        fileScore: {
            public_id: string;
            secure_url: string;
        };
        linkSong: string;
        category: string;
    }  
    status: boolean;
}