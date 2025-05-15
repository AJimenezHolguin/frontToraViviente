
export interface SongInfo {
   _id: string;
   fileSongPublicId: string;
   fileScorePublicId: string;
}

export interface FileData {
   public_id: string;
   secure_url: string;
 }
 
export interface UpdateSong {
   name: string;
   linkSong: string;
   category: string;
   fileSong: FileData | null;
   fileScore: FileData | null;
 }
 