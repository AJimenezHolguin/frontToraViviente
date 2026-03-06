"use client";
import React, { useEffect, useState } from "react";

import { SpinnerComponent } from "@/shared/components/Spinner";
import { useTable } from "@/shared/hooks/songs/useTable";
import { useRenderSongCell } from "@/shared/hooks/songs/useRenderSongCell";
import { ReusableTable } from "@/shared/components/table";
import { baseMovementColumns, columnTitlesPresets } from "@/shared/components/table/columnsAndStatusOptions";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";
import { getAllMovements } from "@/services/movements/getAllMovements.service";
import { Movements } from "@/types/movementsTypesProps";

export const AllMovements = () => {
  const [allMovements, setAllMovements] = useState<Movements[]>([]);
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
  } = useTable(baseMovementColumns,
    ["date", "numReg", "description", "type", "ingreso", "gasto","state","user","ref_id","saldo",],
    columnTitlesPresets["movementsContableTitle"]
  );

  const fetchAllSongs = async () => {
    try {
      const movementsData = await getAllMovements({
        page,
        take: rowsPerPage ?? 5,
        order: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
        search: filterValue,
      });

      setIsLoading(true);
      setAllMovements(movementsData.data || []);
      setTotalPages(movementsData.metadata.pageCount);
      setTotalSongs(movementsData.metadata.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSongs();
  }, [page, rowsPerPage, sortDescriptor, filterValue]);

  const renderCell = useRenderSongCell({});

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

        <ReusableTable
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
          renderCell={renderCell}
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          sortedItems={allMovements}
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
