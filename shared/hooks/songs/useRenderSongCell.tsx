import { Song } from "@/types/SongsTypesProps";
import React from "react";
import { IoLogoYoutube } from "react-icons/io5";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa6";
import { Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon } from "@/shared/components/table/TableIcons";
import { UseRenderSongCellProps } from "./types";
import { COLORS } from "@/styles/colors";

export const useRenderSongCell = ({
  onEdit,
  onDelete,
}: UseRenderSongCellProps) => {
  return React.useCallback((data: Song, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Song];

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
        const userName = data.userName;
        const capitalizedUserName = userName
          ? userName
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : "N/A";

        return <span>{capitalizedUserName}</span>;
      case "linkSong":
        return (
          <a href={data.linkSong} rel="noopener noreferrer" target="_blank">
            <IoLogoYoutube color="red" size={20} />
          </a>
        );
      case "fileSong":
        return data.fileSong?.secure_url ? (
          <a
            className="flex justify-center items-center"
            href={data.fileSong.secure_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaFilePdf color={COLORS.secondary} size={20} />
          </a>
        ) : (
          <span className="text-default-400">N/A</span>
        );
      case "fileScore":
        return data.fileScore?.secure_url ? (
          <a
            className="flex justify-center items-center"
            href={data.fileScore.secure_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaRegFilePdf color={COLORS.secondary} size={20} />
          </a>
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
      default:
        return <span>{String(cellValue)}</span>;
    }
  }, []);
};
