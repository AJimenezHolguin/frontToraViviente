"use client";

import { getAllSongs } from "@/services/songs/getAllSongs.service";
import { InputComponent } from "@/shared/components/Input";
import { TypeProps } from "@/shared/components/Input/types";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { SpinnerVariant } from "@/shared/components/Spinner/types";
import { ReusableTable } from "@/shared/components/table";
import { columnTitlesPresets } from "@/shared/components/table/columnsAndStatusOptions";
import { SearchIcon } from "@/shared/components/table/TableIcons";
import { useRenderSongCell } from "@/shared/hooks/songs/useRenderSongCell";
import { useSongTable } from "@/shared/hooks/songs/useSongTable";
import { Colors } from "@/types/color.enum";
import { Sizes } from "@/types/sizes.enum";
import { Song } from "@/types/SongsTypesProps";
import { useEffect, useState } from "react";

export const AllSongs = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  const [isLoading, setIsLoading] = useState(true);

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
  } = useSongTable(songs, [
    "name",
    "user",
    "linkSong",
    "category",
    "fileSong",
    "fileScore",
  ],columnTitlesPresets["allSongsTitle"]);

  const renderCell = useRenderSongCell({});

  const fetchAllSongs = async () => {
    setIsLoading(true);
    try {
      const songsData = await getAllSongs();

      setSongs(songsData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSongs();
  }, []);

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
