"use client";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "@/shared/components/table/TableIcons";
import { ModalSong } from "@/shared/components/Modal";
import { Song } from "@/types/SongsTypesProps";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { ColorButton } from "@/styles/colorButton.enum";
import { getAllMySongs } from "@/services/songs/getAllMySongs.service";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { useSongTable } from "@/shared/hooks/songs/useSongTable";
import { useRenderSongCell } from "@/shared/hooks/songs/useRenderSongCell";
import { useDeleteSong } from "@/shared/feature/songs/deleteSongHandler";
import { ReusableTable } from "@/shared/components/table";
import { PositionModal } from "@/shared/components/Modal/types";
import { ButtonComponent } from "@/shared/components/Button";
import { columnTitlesPresets } from "@/shared/components/table/columnsAndStatusOptions";
import { Text } from "@/shared/components/Text";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";
import { PaginationHeader } from "@/shared/components/PaginationHeader";

export const MySongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongToEdit, setSelectedSongToEdit] = useState<Song | null>(
    null
  );

  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();
  const { handleDelete, loading } = useDeleteSong(showAlert);

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
  } = useSongTable(
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
    try {
      const songsData = await getAllMySongs({
        page,
        take: rowsPerPage ?? 1,
        order: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
        search: filterValue,
      });

      setIsLoading(true);
      setSongs(songsData.songs || []);
      setTotalPages(songsData.metadata.pageCount);
      setTotalSongs(songsData.metadata.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [page, rowsPerPage, sortDescriptor, filterValue]);

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
              classNames={{ base: "w-full pb-4 sm:max-w-[40%] pb-2" }}
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

          <PaginationHeader
            label="Canciones"
            rowsPerPage={rowsPerPage ?? 0}
            totalItems={totalSongs}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(1);
            }}
          />
        </div>

        <ReusableTable
          ariaLabel="Tabla de canciones"
          headerColumns={headerColumns}
          itemKey="_id"
          page={page}
          renderCell={renderCell}
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          sortedItems={songs}
          totalPages={totalPages}
          onPageChange={setPage}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        />
      </WrapperTitle>
    </>
  );
};
