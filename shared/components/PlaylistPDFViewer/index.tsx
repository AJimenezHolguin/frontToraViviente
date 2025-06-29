"use client";

import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { getAllMyPlaylist } from "@/services/playlists/getAllMyPlaylist.service";
import { Playlist } from "@/types/PlaylistsTypesProps";
import { useParams } from "next/navigation";
import { SpinnerComponent } from "../Spinner";

// Props del componente
interface Props {
 
  type: "fileSong" | "fileScore";
}

// Archivos PDF
interface FileData {
  public_id: string;
  secure_url: string;
}

interface DisplaySong {
  _id: string;
  name: string;
  file: FileData;
  title: string
}

// Estructura interna de canción
interface File {
  public_id: string;
  secure_url: string;
}

interface SongPlaylist {
  _id: string;
  title: string;
  category: string;
  linkSong: string;
  fileSong?: File;
  fileScore?: File;
}



export default function PlaylistPDFViewer({ type }: Props) {

  const params = useParams();
  const playlistId = params.playlistId as string;
  
  const [songs, setSongs] = useState<DisplaySong[]>([]);
  const [selected, setSelected] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen,setIsSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await getAllMyPlaylist({
          page: 1,
          take: 10,
          order: "DESC",
          search: "",
        });
        setIsLoading(true);   
        console.log("estos son los datos de la playlists",res)
        
        console.log("playlistId que llega como prop:", playlistId);
        console.log("Playlists recibidas:", res.data.map((p: any) => p._id));

        const playlist = res.data.find(
          (pl): pl is Playlist => pl._id === playlistId
        );
        
        if (!playlist) {
          // throw new Error("Playlist no encontrada");
          console.error("Playlist no encontrada con ID:", playlistId);
          console.error("Playlists disponibles:", res.data.map((p: any) => p._id));
        }
        

        const filteredSongs: DisplaySong[] = playlist
          ? (playlist.songs as unknown as SongPlaylist[])
              .filter((song: SongPlaylist) => !!song[type]?.secure_url)
              .map((song: SongPlaylist) => ({
                _id: song._id,
                name: song[type]!.public_id,
                title: song.title,
                file: {
                  public_id: song[type]!.public_id,
                  secure_url: song[type]!.secure_url,
                },
              }))
          : [];
          console.log("este es el filteredSongs",filteredSongs)
               
        setSongs(filteredSongs);
        setSelected(filteredSongs[0]?.file || null);
      } catch (err) {
        console.error("Error cargando canciones:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSongs();
  }, [playlistId, type]);

  if (isLoading) return <SpinnerComponent />;

  if (songs.length === 0)
    return <div className="p-4">No se encontraron archivos PDF.</div>;

  return (

    <div className="flex h-screen overflow-hidden relative border rounded-lg shadow ">
    {/* Sidebar (Lista de canciones) */}
<div
  className={`transition-all duration-300 bg-white border-r flex flex-col ${
    isSidebarOpen ? "w-3/4"  : "w-10"
  } overflow-hidden min-w-0`}
>
  <div className="flex justify-between items-center p-4">
    {isSidebarOpen ? (
      <>
        <h1 className="text-2xl font-bold">Canciones</h1>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-xl font-bold"
          title="Ocultar"
        >
          &lt;
        </button>
      </>
    ) : (
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="text-xl font-bold "
        title="Mostrar lista"
      >
        &gt;
      </button>
    )}
  </div>

  {/* Lista de canciones */}
  {isSidebarOpen && (
    <div className="w-[600px] flex-1 p-4 overflow-y-auto">
      <ul className="space-y-2">
        {songs.map((song) => (
          <button
            key={song._id}
            className={`cursor-pointer w-full text-left p-2 rounded-md flex items-center gap-2 hover:bg-gray-100 ${
              selected?.public_id === song.file.public_id
                ? "bg-gray-200"
                : ""
            }`}
            onClick={() => setSelected(song.file)}
          >
            <FaFilePdf className="text-secondary" />
            <span className="block w-full break-words"> {song.title.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</span>
          </button>
        ))}
      </ul>
    </div>
  )}
</div>

    {/* Visor PDF */}
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "w-full" : "w-full"
      } h-full`}
    >
      {selected ? (
        <iframe
          src={selected.secure_url}
          className="w-full h-full"
          title={selected.public_id}
        />
      ) : (
        <div className="p-4">Selecciona una canción para visualizar.</div>
      )}
    </div>
  </div>

    
  );
  
}
