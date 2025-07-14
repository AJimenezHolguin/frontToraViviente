import { Song } from "@/types/SongsTypesProps";
import React from "react";
import { IoLogoYoutube } from "react-icons/io5";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa6";
import { Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon } from "@/shared/components/table/TableIcons";
// import { UseRenderSongCellProps } from "./types";
import { COLORS } from "@/styles/colors";
import { UseRenderPlaylistsCellProps } from "./types";
import { Playlist } from "@/types/PlaylistsTypesProps";
import { SwitchComponent } from "@/shared/components/Switch";
import Link from 'next/link';


export const useRenderPlaylistsCell = ({
  onEdit,
  onDelete,
}: UseRenderPlaylistsCellProps) => {
  return React.useCallback((data: Playlist, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Playlist];

    switch (columnKey) {
      case "name":
        return (
          <span>
            {data.name
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>
        );
      case "user":
        const userName = data.createdBy.name;
        const capitalizedUserName = userName
          ? userName
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : "N/A";

        return <span>{capitalizedUserName}</span>;
   
      case "fileSong":
        const hasFileSong = Array.isArray(data.songs) && data.songs.some((song) => song.fileSong?.secure_url);
  
        return hasFileSong ? (
    <Link 
     className="flex justify-center items-center"
     href={`/dashboard/my-playlists/${data._id}/songs`}
    >
      <FaFilePdf color={COLORS.secondary} size={20} />
    </Link>
  ) : (
    <span className="text-default-400">N/A</span>
  );
      case "fileScore":
        const hasFileScore = Array.isArray(data.songs) && data.songs.some((song) => song.fileScore?.secure_url);
        
        return hasFileScore ? (
          <Link
            className="flex justify-center items-center"
            href={`/dashboard/my-playlists/${data._id}/scores`}
          >
            <FaRegFilePdf color={COLORS.secondary} size={20} />
          </Link>
        ) : (
          <span className="text-default-400">N/A</span>
        );

      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Editar">
              <button
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => onEdit && onEdit(data)}
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar">
              <button
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => onDelete && onDelete(data)}
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        );
        case "status":
          return  (
             <SwitchComponent  />
          
          );
      default:
        return <span>{String(cellValue)}</span>;
    }
  }, []);
};
