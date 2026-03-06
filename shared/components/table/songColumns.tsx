import { Song } from "@/types/SongsTypesProps";
import { IoLogoYoutube } from "react-icons/io5";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa6";
import { COLORS } from "@/styles/colors";
import { TableColumnType } from "./types";

export const songColumns:TableColumnType<Song>[] = [
  {
    uid: "name",
    name: "NOMBRE",
    sortable: true,
    render: (song: Song) => (
      <span>
        {song.name
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    ),
  },

  {
    uid: "userName",
    name: "USUARIO",
    render: (song: Song) => (
      <span>
        {song.userName
          ?.split(" ")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ") ?? "N/A"}
      </span>
    ),
  },

  {
    uid: "linkSong",
    name: "YOUTUBE",
    render: (song: Song) => (
      <a href={song.linkSong} target="_blank" rel="noopener noreferrer">
        <IoLogoYoutube color="red" size={20} />
      </a>
    ),
  },

  {
    uid: "fileSong",
    name: "LETRAS",
    render: (song: Song) =>
      song.fileSong?.secure_url ? (
        <a href={song.fileSong.secure_url} target="_blank" rel="noopener noreferrer">
          <FaFilePdf color={COLORS.secondary} size={20} />
        </a>
      ) : (
        <span>N/A</span>
      ),
  },

  {
    uid: "fileScore",
    name: "ACORDES",
    render: (song: Song) =>
      song.fileScore?.secure_url ? (
        <a href={song.fileScore.secure_url} target="_blank" rel="noopener noreferrer">
          <FaRegFilePdf color={COLORS.secondary} size={20} />
        </a>
      ) : (
        <span>N/A</span>
      ),
  },
];