import { DisplaySong, FileData } from "@/shared/components/PlaylistPDFViewer/types";


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

export interface PlaylistSidebarProps {
    songs: DisplaySong[];
    selected: FileData | null;
    setSelected: (file: FileData) => void;
    moveItem: (fromIndex: number, toIndex: number) => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    playlistName: string;
    type: "fileSong" | "fileScore";
  }

  export interface PDFViewerProps {
    selected: FileData | null;
  }

 export type PlaylistType  = "my-playlists" | "all-playlists" ;