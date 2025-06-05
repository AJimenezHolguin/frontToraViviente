"use client";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "@/shared/components/table/TableIcons";
import { ModalSong } from "@/shared/components/Modal";
import { Song } from "@/types/SongsTypesProps";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { ColorButton } from "@/styles/colorButton.enum";
import { getMySongs } from "@/services/songs/getMySongs.service";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { useSongTable } from "../../../shared/hooks/songs/useSongTable";
import { useRenderSongCell } from "@/shared/hooks/songs/useRenderSongCell";
import { useDeleteSong } from "@/shared/feature/songs/deleteSongHandler";
import { ReusableTable } from "@/shared/components/table";
import { PositionModal } from "@/shared/components/Modal/types";
import { ButtonComponent } from "@/shared/components/Button";
import { columnTitlesPresets } from "@/shared/components/table/columnsAndStatusOptions";
import { Text } from "@/shared/components/Text";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";

export const MySongs = () => {
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
  } = useSongTable(
    songs,
    [
      "name",
      "user",
      "linkSong",
      "category",
      "fileSong",
      "fileScore",
      "actions",
    ],
    columnTitlesPresets["mySongsTitle"]
  );

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

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <WrapperTitle title="Lista general de mis canciones">
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

        <ConfirmModal
          {...ConfirmModalProps}
          isLoading={loading}
          placement={PositionModal.CENTER}
          title={loading ? "Eliminando..." : "Confirmar"}
        />
        <AlertModal {...AlertModalProps} placement={PositionModal.CENTER} />

        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <SearchComponent
              classNames={{ base: "w-full sm:max-w-[40%]" }}
              value={filterValue}
              onClear={onClear}
              onValueChange={onSearchChange}
            />
            <ButtonComponent
              color={ColorButton.PRIMARY}
              endContent={<PlusIcon />}
              onPress={() => {
                setSelectedSongToEdit(null);
                setIsModalOpen(true);
              }}
            >
              <Text $fw={500} $v="md">
                Crear canción
              </Text>
            </ButtonComponent>
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
      </WrapperTitle>
    </>
  );
};
