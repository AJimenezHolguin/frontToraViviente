"use client";
import React, { useEffect, useState } from "react";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { useSongTable } from "@/shared/hooks/songs/useSongTable";
import { ReusableTable } from "@/shared/components/table";
import { columnTitlesPresets } from "@/shared/components/table/columnsAndStatusOptions";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";
import { PaginationHeader } from "@/shared/components/PaginationHeader";
import { Playlist } from "../../../types/PlaylistsTypesProps";
import { useRenderPlaylistsCell } from "@/shared/hooks/playlists/useRenderPlaylistsCell";
import { getAllPlaylist } from "@/services/playlists/getAllPlaylist.service";

export const AllPlayLists = () => {
  const [allPlaylist, setAllPlaylist] = useState<Playlist[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAllPlaylists, setTotalAllPlaylists] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    ["name", "user", "fileSong", "fileScore"],
    columnTitlesPresets["allPlayListsTitle"]
  );

  const fetchPlaylists = async () => {
    try {
      const playlistData = await getAllPlaylist({
        page,
        take: rowsPerPage ?? 5,
        order: sortDescriptor.direction === "descending" ? "ASC" : "DESC",
        search: filterValue,
      });

      setIsLoading(true);
      setAllPlaylist(playlistData.data || []);
      setTotalPages(playlistData.metadata.pageCount);
      setTotalAllPlaylists(playlistData.metadata.total);
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
    type: "all-playlists",
  });

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <WrapperTitle title="Lista general de todas las playlists">
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
          </div>

          <PaginationHeader
            label="Playlists"
            rowsPerPage={rowsPerPage ?? 0}
            totalItems={totalAllPlaylists}
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
          sortedItems={allPlaylist}
          totalPages={totalPages}
          onPageChange={setPage}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        />
      </WrapperTitle>
    </>
  );
};
