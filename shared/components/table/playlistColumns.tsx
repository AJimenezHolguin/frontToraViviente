import { Playlist } from "@/types/PlaylistsTypesProps";
import { TableColumnType } from "./types";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa6";
import { COLORS } from "@/styles/colors";


export const playlistColumns:TableColumnType<Playlist>[] = [

    {
        uid: "name",
        name: "NOMBRE",
        sortable: true,
        align: "start",
        render: (playlist: Playlist) => (
          <span>
            {playlist.name
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>
        ),
      },
      {
        uid: "user",
        name: "USUARIO",
        align: "start",
        render: (playlist: Playlist) => (
          <span>
            {playlist.createdBy.name
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ") ?? "N/A"}
          </span>
        ),
      },
      {
        uid: "fileSong",
        name: "LETRAS",
        align: "center",
        render: (playlist: Playlist) => {
          const hasFileSong =
            Array.isArray(playlist.songs) &&
            playlist.songs.some(song => song.fileSong?.secure_url);
  
          return hasFileSong ? (
            <Link
              href={`/dashboard/all-playlists/${playlist._id}/songs`}
              className="flex justify-center items-center"
            >
              <FaFilePdf color={COLORS.secondary} size={20} />
            </Link>
          ) : (
            <span className="text-default-400">N/A</span>
            );
            },
      },
      {
        uid: "fileScore",
        name: "ACORDES",
        align: "center",
        render: (playlist: Playlist) => {
          const hasFileScore =
            Array.isArray(playlist.songs) &&
            playlist.songs.some(song => song.fileScore?.secure_url);
  
          return hasFileScore ? (
            <Link
              href={`/dashboard/all-playlists/${playlist._id}/scores`}
              className="flex justify-center items-center"
            >
              <FaFilePdf color={COLORS.secondary} size={20} />
            </Link>
          ) : (
            <span className="text-default-400">N/A</span>
            );
            },
      }
]