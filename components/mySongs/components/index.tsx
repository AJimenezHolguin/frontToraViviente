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
import { useDeleteSong } from "@/shared/feature/songs/deleteSongHandler";
import { ReusableTable } from "@/shared/components/table";
import { PositionModal } from "@/shared/components/Modal/types";
import { ButtonComponent } from "@/shared/components/Button";
import { Text } from "@/shared/components/Text";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";
import { useTable } from "@/shared/hooks/songs/useTable";
import { songColumns } from "@/shared/components/table/songColumns";
import { createActionColumn } from "@/shared/components/table/tableActionsColumn";

export const MySongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongToEdit, setSelectedSongToEdit] = useState<Song | null>(
    null
  );

  const { showAlert, AlertModalProps, ConfirmModalProps } = useModalAlert();
  const { loading } = useDeleteSong(showAlert);

  const handleEditSong = (song: Song) => {
    setSelectedSongToEdit(song);
    setIsModalOpen(true);
  };

  const columns = React.useMemo(
    () => [
      ...songColumns,
      createActionColumn<Song>({
        onEdit: handleEditSong,
      }),
    ],
    [handleEditSong]
  );

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
  } = useTable<Song>(columns);

  const fetchSongs = async () => {
    try {
      const songsData = await getAllMySongs({
        page,
        take: rowsPerPage ?? 5,
        order: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
        search: filterValue,
      });
      
      setIsLoading(true);
      setSongs(songsData.data || []);
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

        <div className="flex flex-col gap-6">
          <div className="flex justify-between gap-3 items-start">
            <SearchComponent
              classNames={{
                base: "w-full pb-4 text-secondary sm:max-w-[33%] pb-2",
                input: "placeholder:text-secondary ",
                inputWrapper: "bg-white ",
              }}
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

          <ReusableTable<Song>
            ariaLabel="Tabla de canciones"
            totalItems={totalSongs}
            label="Canciones"
            rowsPerPage={rowsPerPage ?? 5}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(1);
            }}
            headerColumns={headerColumns}
            itemKey="_id"
            page={page}
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            sortedItems={songs}
            totalPages={totalPages}
            onPageChange={setPage}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          />
        </div>
      </WrapperTitle>
    </>
  );
};
