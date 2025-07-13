
// Props del componente
export interface Props {
 
    type: "fileSong" | "fileScore";
  }
  
  // Archivos PDF
 export interface FileData {
    public_id: string;
    secure_url: string;
  }
  
 export interface DisplaySong {
    _id: string;
    name: string;
    file: FileData;
    title: string
    linkSong: string;
  }
  
  // Estructura interna de canción
 export interface File {
    public_id: string;
    secure_url: string;
  }
  
 export interface SongPlaylist {
    _id: string;
    title: string;
    category: string;
    linkSong: string;
    fileSong?: File;
    fileScore?: File;
  }
  