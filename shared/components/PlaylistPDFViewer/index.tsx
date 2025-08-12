"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { SpinnerComponent } from "../Spinner";
import { Props } from "./types";
import { usePlaylistSongs } from "@/shared/hooks/playlists/usePlaylistSongs";
import { PlaylistSidebar } from "../PlaylistSidebar";
import { PDFViewer } from "../PDFViewer";

export default function PlaylistPDFViewer({ type }: Props) {
  const { playlistId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    songs,
    selected,
    setSelected,
    isLoading,
    playlistName,
    moveItem,
  } = usePlaylistSongs(playlistId as string, type);

  if (isLoading) return <SpinnerComponent />;

  if (songs.length === 0)
    return <div className="p-4">No se encontraron archivos PDF.</div>;

  return (
    <div className="flex h-[90vh] overflow-hidden">
      <PlaylistSidebar
        isSidebarOpen={isSidebarOpen}
        moveItem={moveItem}
        playlistName={playlistName}
        selected={selected}
        setSelected={setSelected}
        songs={songs}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        type={type}
      />
      <div className="transition-all duration-300 h-[90vh] w-full overflow-hidden">
        <PDFViewer 
        selected={selected} 
        setSelected={setSelected}
        songs={songs}
        />
      </div>
    </div>
  );
}
