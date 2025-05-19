"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@heroui/react";
import { PlusIcon, SearchIcon } from "@/shared/components/table/TableIcons";
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
import { ReusableTable } from "@/shared/components/table";

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

      <ConfirmModal {...ConfirmModalProps} isLoading={loading}/>
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

      <ReusableTable
        ariaLabel="Tabla de canciones"
        headerColumns={headerColumns}
        itemKey="_id"
        page={page}
        renderCell={renderCell}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        sortedItems={sortedItems}
        totalPages={totalPages}
        onPageChange={setPage}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
        onSortChange={setSortDescriptor}
      />
    </>
  );
};
