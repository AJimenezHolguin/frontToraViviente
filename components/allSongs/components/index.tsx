"use client";
import React, { useEffect, useState } from "react";
import { Song } from "@/types/SongsTypesProps";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { useTable } from "@/shared/hooks/songs/useTable";
import { ReusableTable } from "@/shared/components/table";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";
import { getAllSongs } from "@/services/songs/getAllSongs.service";
import { songColumns } from "@/shared/components/table/songColumns";

export const AllSongs = () => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);
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
  } = useTable(songColumns);

  const fetchAllSongs = async () => {
    setIsLoading(true);
    try {
      const songsData = await getAllSongs({
        page,
        take: rowsPerPage ?? 5,
        order: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
        search: filterValue,
      });

      setAllSongs(songsData.data || []);
      setTotalPages(songsData.metadata.pageCount);
      setTotalSongs(songsData.metadata.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSongs();
  }, [page, rowsPerPage, sortDescriptor, filterValue]);

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <WrapperTitle title="Lista general de todas las canciones">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between gap-3 items-end">
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

          <ReusableTable<Song>
            ariaLabel="Tabla de canciones"
            label="Canciones"
            rowsPerPage={rowsPerPage ?? 5}
            totalItems={totalSongs}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(1);
            }}
            headerColumns={headerColumns}
            itemKey="_id"
            page={page}
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            sortedItems={allSongs}
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
