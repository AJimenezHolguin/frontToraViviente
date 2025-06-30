"use client";

import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { getAllMyPlaylist } from "@/services/playlists/getAllMyPlaylist.service";
import { Playlist } from "@/types/PlaylistsTypesProps";
import { useParams } from "next/navigation";
import { SpinnerComponent } from "../Spinner";
import { IoLogoYoutube } from "react-icons/io5";
import { PiScreencast } from "react-icons/pi";
import { Text } from "../Text";
import { COLORS } from "@/styles/colors";
import { WrapperTitle } from "../WrapperTitle";
import { WrapperSubTitle } from "../WrapperSubTitle";

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
  linkSong: string;
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
  const [playlistName, setPlaylistName] = useState<string>("");


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
        if ( playlist){
          setPlaylistName(playlist.name);
        }
        

        const filteredSongs: DisplaySong[] = playlist
          ? (playlist.songs as unknown as SongPlaylist[])
              .filter((song: SongPlaylist) => !!song[type]?.secure_url)
              .map((song: SongPlaylist) => ({
                _id: song._id,
                name: song[type]!.public_id,
                title: song.title,
                linkSong: song.linkSong,
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

    <div className="flex h-screen overflow-hidden">


    {/* Sidebar (Lista de canciones) */}
<div
  className={`transition-all duration-300 bg-white border-r flex flex-col ${
    isSidebarOpen ? "w-3/4"  : "w-10"
  } overflow-hidden min-w-0`}
>
  <div className="flex justify-between items-start p-4">
    {isSidebarOpen ? (
      <>
      
        <Text $color={COLORS.primary}
        $ta="left" 
        $v="h4" 
        className="pl-1">
        
        {playlistName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        </Text>
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
        className="text-xl font-bold"
        title="Mostrar lista"
      >
        &gt;
      </button>
    )}
  </div>

  {/* Lista de canciones */}
  {isSidebarOpen && (
    <div className="w-[600px] flex-1 p-4 overflow-y-auto h-full ">
      <WrapperSubTitle title="Letras: ">   
        <div className="pt-6">
      <ul className="flex flex-col ">
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
            <FaFilePdf className="text-secondary" size={20}/>
            <span className="block w-full break-words"> {song.title.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</span>
            <a href={song.linkSong} rel="noopener noreferrer" target="_blank">
            <IoLogoYoutube color="red" size={20} />
          </a>
          
          </button>
        ))}
      </ul>
        
        </div>      
      </WrapperSubTitle>
    </div>
  )}
</div>

    {/* Visor PDF */}
    <div
      className={`transition-all duration-300 h-full overflow-hidden ${
        isSidebarOpen ? "w-full" : "w-full"
      } h-full`}
    >
      {selected ? (
        <>
         <div className="p-2 flex justify-end items-center">
         <a href={selected.secure_url} rel="noopener noreferrer" target="_blank" title="PDF pantalla completa">
            <PiScreencast size={20} />
          </a>
       </div>
        <iframe
        src={selected.secure_url}
        className="w-full h-full"
        title={selected.public_id}
        
        
        />
        </>
        
      ) : (
        <div className="p-4">Selecciona una canción para visualizar.</div>
      )}
    </div>
  </div>

    
  );
  
}
