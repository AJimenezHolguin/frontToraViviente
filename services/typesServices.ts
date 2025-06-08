import { Song } from "@/types/SongsTypesProps";

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

 export type GetAllSongsParamsProps = {
   page: number;
   take: number;
   order: "ASC" | "DESC";
   search: string;
 };
 
 export type PaginationMetadataResponse = {
   page: number;
   take: number;
   total: number;
   pageCount: number;
   hasPreviousPage: boolean;
   hasNextPage: boolean;
   order: "ASC" | "DESC";
   sortBy: string;
   search: string;
 };
 
 // Tipo para lo que devuelve este servicio
 export type GetAllMySongsResponse = {
   data: Song[];
   metadata: PaginationMetadataResponse;
   success: boolean;
 };