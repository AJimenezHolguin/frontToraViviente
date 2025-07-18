import { Playlist } from "@/types/PlaylistsTypesProps";
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

 export type PaginationParamsProps = {
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

 export type GetAllMyPlaylistsResponse = {
  data: Playlist[];
  metadata: PaginationMetadataResponse;
  success: boolean;
 }
 // Tipos para actualizar la playlist
export interface UpdatePlaylistPayload {
  name?: string;
  songs?: string[]; 
  status?: boolean;
}

export interface UpdatePlaylistResponse {
  success: boolean;
  message: string;
  data?: Playlist;
}