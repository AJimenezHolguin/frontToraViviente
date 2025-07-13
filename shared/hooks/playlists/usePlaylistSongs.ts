// hooks/usePlaylistSongs.ts
import { useEffect, useState } from "react";
import { getAllMyPlaylist } from "@/services/playlists/getAllMyPlaylist.service";
import { Playlist } from "@/types/PlaylistsTypesProps";

import { updatePlaylist } from "@/services/playlists/updatePlaylist.service";
import {
  DisplaySong,
  FileData,
  SongPlaylist,
} from "@/shared/components/PlaylistPDFViewer/types";

export function usePlaylistSongs(
  playlistId: string,
  type: "fileSong" | "fileScore"
) {
  const [songs, setSongs] = useState<DisplaySong[]>([]);
  const [selected, setSelected] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playlistName, setPlaylistName] = useState<string>("");

  useEffect(() => {
    async function fetchSongs() {
      setIsLoading(true);
      try {
        const res = await getAllMyPlaylist({
          page: 1,
          take: 10,
          order: "DESC",
          search: "",
        });

        const playlist = res.data.find(
          (pl): pl is Playlist => pl._id === playlistId
        );

        if (!playlist) return;

        setPlaylistName(playlist.name);

        const filteredSongs: DisplaySong[] = (
          playlist.songs as unknown as SongPlaylist[]
        )
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
          }));

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

  const moveItem = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= songs.length) return;

    const updatedSongs = [...songs];
    const [movedItem] = updatedSongs.splice(fromIndex, 1);

    updatedSongs.splice(toIndex, 0, movedItem);
    setSongs(updatedSongs);

    try {
      await updatePlaylist(playlistId, {
        songs: updatedSongs.map((song) => song._id),
      });
    } catch (error) {
      console.error("Error al actualizar el orden:", error);
    }
  };

  return {
    songs,
    selected,
    setSelected,
    isLoading,
    playlistName,
    moveItem,
  };
}
