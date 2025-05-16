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
} from "@heroui/react";

import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
} from "@/shared/components/table/TableIcons";


import { ModalSong } from "@/shared/components/Modal";

import { Song } from "@/types/SongsTypesProps";

import { SpinnerComponent } from "@/shared/components/Spinner";
import { Sizes } from "@/types/sizes.enum";
import { Colors } from "@/types/color.enum";
import { SpinnerVariant } from "@/shared/components/Spinner/types";

import { getMySongs } from "@/services/songs/getMySongs.service";

import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { useSongTable } from "../../../shared/hooks/songs/useSongTable";
import { useRenderSongCell } from "@/shared/hooks/songs/useRenderSongCell";
import { useDeleteSong } from "@/shared/feature/songs/deleteSongHandler";


export const CreateSong = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongToEdit, setSelectedSongToEdit] = useState<Song | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
  useModalAlert();
  const { handleDelete, loading } = useDeleteSong(showAlert);

  const renderCell = useRenderSongCell({
    onEdit: (song) => {
      setSelectedSongToEdit(song);
      setIsModalOpen(true);
    },
    onDelete: (song) => {
      showConfirm(`¿Estás seguro de eliminar "${song.name}"?`, async () => {
        await handleDelete(song);
        fetchSongs();
      });
    },
  });

  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortDescriptor,
    setSortDescriptor,
    filterValue,
    onSearchChange,
    onClear,
    selectedKeys,
    setSelectedKeys,
    visibleColumns,
    setVisibleColumns,
    headerColumns,
    sortedItems,
    totalSongs,
    totalPages,
  } = useSongTable(songs);

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
            Total {totalSongs} canciones
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
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
              total={totalPages}
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
