"use client";
import React, { SVGProps, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
} from "@heroui/react";

import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
} from "@/shared/components/table/TableIcons";
import { columns } from "@/shared/components/table/columnsAndStatusOptions";

import { ModalSong } from "@/shared/components/Modal";

import { Song } from "@/types/SongsTypesProps";

import { IoLogoYoutube } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa6";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { Sizes } from "@/types/sizes.enum";
import { Colors } from "@/types/color.enum";
import { SpinnerVariant } from "@/shared/components/Spinner/types";
import { COLORSTEXT } from "@/shared/styles/colors";
import { getMySongs } from "@/services/songs/getMySongs.service";
import { deleteSong } from "@/services/songs/deleteSong.service";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { useModalAlert } from "@/shared/components/Modal/hooks/useModalAlert";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "user",
  "linkSong",
  "category",
  "fileSong",
  "fileScore",
  "actions",
];

export const CreateSong = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedSongToDelete, setSelectedSongToDelete] = useState<Song | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [selectedSongToEdit, setSelectedSongToEdit] = useState<Song | null>(
    null
  );
  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();

  const fetchSongs = async () => {
    setIsLoading(true);

    try {
      const songsData = await getMySongs();

      setSongs(songsData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filtered = [...songs];

    if (hasSearchFilter) {
      filtered = filtered.filter((data) =>
        data.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [songs, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Song] as string;
      const second = b[sortDescriptor.column as keyof Song] as string;

      return sortDescriptor.direction === "ascending"
        ? String(first).localeCompare(String(second))
        : String(second).localeCompare(String(first));
    });
  }, [sortDescriptor, items]);

  const handleDelete = async (song: Song) => {
    try {
      setLoading(true);
      await deleteSong({
        _id: song._id,
        fileSongPublicId: song.fileSong.public_id,
        fileScorePublicId: song.fileScore.public_id,
      });

      showAlert("success", "Canción eliminada correctamente!");
    } catch (err) {
      console.error(err);
      showAlert("error", "Error al eliminar la canción!");
    } finally {
      setLoading(false);
    }
  };

  const renderCell = React.useCallback((data: Song, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Song];

    switch (columnKey) {
      case "user":
        return <span>{data.user?.name || "N/A"}</span>;
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
            <FaFilePdf color={COLORSTEXT.secondary} size={20} />
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
            <FaRegFilePdf color={COLORSTEXT.secondary} size={20} />
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
                onClick={() => {
                  setSelectedSongToEdit(data);
                  setIsModalOpen(true);
                }}
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar">
              <button
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedSongToDelete(data);
                  showConfirm(
                    `¿Estás seguro de eliminar "${data.name}"?`,
                    async () => {
                      await handleDelete(data);
                    }
                  );
                }}
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

  const onSearchChange = (value?: string) => {
    setFilterValue(value || "");
    setPage(1);
  };

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <SpinnerComponent
          color={Colors.PRIMARY}
          size={Sizes.MD}
          variant={SpinnerVariant.WAVE}
        />
      </div>
    );
  }

  return (
    <>
      <ModalSong
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        songToEdit={selectedSongToEdit}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSongToEdit(null);
        }}
        onSongCreated={fetchSongs}
      />

      <ConfirmModal {...ConfirmModalProps} />
      <AlertModal {...AlertModalProps} />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onPress={() => {
              setSelectedSongToEdit(null);
              setIsModalOpen(true);
            }}
          >
            Crear
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {songs.length} canciones
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small "
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>

      <Table
        isHeaderSticky
        aria-label="Tabla de canciones"
        bottomContent={
          <div className="py-2 px-2 flex z-0 justify-between items-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="No se encontraron canciones"
          itemID="_id"
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
