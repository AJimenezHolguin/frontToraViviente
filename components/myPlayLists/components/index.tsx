"use client";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "@/shared/components/table/TableIcons";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { ColorButton } from "@/styles/colorButton.enum";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { useSongTable } from "@/shared/hooks/songs/useSongTable";
import { ReusableTable } from "@/shared/components/table";
import { PositionModal } from "@/shared/components/Modal/types";
import { ButtonComponent } from "@/shared/components/Button";
import { columnTitlesPresets } from "@/shared/components/table/columnsAndStatusOptions";
import { Text } from "@/shared/components/Text";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";
import { PaginationHeader } from "@/shared/components/PaginationHeader";
import { Playlist } from "../../../types/PlaylistsTypesProps";
import { useRenderPlaylistsCell } from "@/shared/hooks/playlists/useRenderPlaylistsCell";
import { getAllMyPlaylist } from "@/services/playlists/getAllMyPlaylist.service";
import { ModalPlaylist } from "@/shared/components/ModalPlayLists";
import { useDeletePlaylist } from "@/shared/feature/ playlist/deletePlaylistHandler";

export const MyPlayLists = () => {
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPlaylists, setTotalPlaylists] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayListToEdit, setSelectedPlaylistsToEdit] =
    useState<Playlist | null>(null);

  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();
  const { handleDelete, loading } = useDeletePlaylist(showAlert);

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
    ["name", "user", "fileSong", "fileScore", "actions", "status"],
    columnTitlesPresets["myPlayListsTitle"]
  );

  const fetchPlaylists = async () => {
    try {
      const playlistData = await getAllMyPlaylist({
        page,
        take: rowsPerPage ?? 5,
        order: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
        search: filterValue,
      });

      setIsLoading(true);
      setPlaylist(playlistData.data || []);
      setTotalPages(playlistData.metadata.pageCount);
      setTotalPlaylists(playlistData.metadata.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [page, rowsPerPage, sortDescriptor, filterValue]);

  const renderCell = useRenderPlaylistsCell({
    onEdit: (Playlist) => {
      setSelectedPlaylistsToEdit(Playlist);
      setIsModalOpen(true);
    },
    onDelete: (Playlist) => {
      showConfirm(
        `¿Estás seguro de que deseas eliminar la playlist "${Playlist.name}"?`,
        async () => {
          await handleDelete(Playlist);
          fetchPlaylists();
        }
      );
    },
    type: "my-playlists",
  });

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <WrapperTitle title="Lista general de mis playlists">
        <ModalPlaylist
          isOpen={isModalOpen}
          playlistToEdit={selectedPlayListToEdit}
          onClose={() => {
            setIsModalOpen(false);
          }}
          onPlaylistCreated={fetchPlaylists}
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
                setSelectedPlaylistsToEdit(null);
                setIsModalOpen(true);
              }}
            >
              <Text $fw={500} $v="md">
                Crear playlists
              </Text>
            </ButtonComponent>
          </div>

          <PaginationHeader
            label="Playlists"
            rowsPerPage={rowsPerPage ?? 0}
            totalItems={totalPlaylists}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(1);
            }}
          />
        </div>

        <ReusableTable
          ariaLabel="Tabla de playlists"
          headerColumns={headerColumns}
          itemKey="_id"
          page={page}
          renderCell={renderCell}
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          sortedItems={playlist}
          totalPages={totalPages}
          onPageChange={setPage}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        />
      </WrapperTitle>
    </>
  );
};
