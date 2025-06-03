"use client";
import { getMySongs } from "@/services/songs/getMySongs.service";
import { ButtonComponent } from "@/shared/components/Button";
import { InputComponent } from "@/shared/components/Input";
import { TypeProps } from "@/shared/components/Input/types";
import { ModalSong } from "@/shared/components/Modal";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { PositionModal } from "@/shared/components/Modal/types";
import { ModalPlaylist } from "@/shared/components/ModalPlayLists";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { SpinnerVariant } from "@/shared/components/Spinner/types";
import { ReusableTable } from "@/shared/components/table";
import { columnTitlesPresets } from "@/shared/components/table/columnsAndStatusOptions";
import { PlusIcon, SearchIcon } from "@/shared/components/table/TableIcons";
import { useDeleteSong } from "@/shared/feature/songs/deleteSongHandler";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { useRenderSongCell } from "@/shared/hooks/songs/useRenderSongCell";
import { useSongTable } from "@/shared/hooks/songs/useSongTable";
import { ColorButton } from "@/styles/colorButton.enum";
import { Sizes } from "@/types/sizes.enum";
import { Song } from "@/types/SongsTypesProps";
import Link from "next/link";
import { useEffect, useState } from "react";

export const MyPlayLists = () => {
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
    ["name", "user", "fileSong", "fileScore", "actions"],
    columnTitlesPresets["myPlayListsTitle"]
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

  if (isLoading) return <SpinnerComponent />
      
  return (
    <>
      <ConfirmModal
        {...ConfirmModalProps}
        isLoading={loading}
        placement={PositionModal.CENTER}
        title={loading ? "Eliminando..." : "Confirmar"}
      />
      <AlertModal {...AlertModalProps} placement={PositionModal.CENTER} />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <InputComponent
            classNames={{
              base: "w-full sm:max-w-[44%]",
            }}
            isClearable={true}
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            type={TypeProps.SEARCH}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />

          <ButtonComponent
            color={ColorButton.PRIMARY}
            endContent={<PlusIcon />}
            onPress={() => {
              setIsModalOpen(true);
            }}
          >
            Crear playlist
          </ButtonComponent>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {totalSongs} playlist
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

      <ModalPlaylist
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />

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
