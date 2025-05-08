
export interface SOngInfo {
   _id: string;
   fileSongPublicId: string;
   fileScorePublicId: string;
}

export interface FileData {
   public_id: string;
   secure_url: string;
 }
 
export interface UpdateSongDto {
   name: string;
   linkSong: string;
   category: string;
   fileSong: FileData;
   fileScore: FileData;
 }
 