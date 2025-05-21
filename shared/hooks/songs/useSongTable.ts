import { useMemo, useState } from "react";
import { Song } from "@/types/SongsTypesProps";
import { Selection, SortDescriptor } from "@heroui/react";
import { columns as allColumns } from "@/shared/components/table/columnsAndStatusOptions";

// 👇 Ahora acepta includedColumnIds como parámetro opcional
export const useSongTable = (
  songs: Song[],
  includedColumnIds: string[] = [
    "name",
    "user",
    "linkSong",
    "category",
    "fileSong",
    "fileScore",
    "actions",
  ]
) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(includedColumnIds)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  // 👇 Filtra columnas disponibles según las que se incluyeron
  const headerColumns = useMemo(() => {
    const baseColumns = allColumns.filter((col) =>
      includedColumnIds.includes(col.uid)
    );

    if (visibleColumns === "all") return baseColumns;

    return baseColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, includedColumnIds]);

  const filteredItems = useMemo(() => {
    let filtered = [...songs];

    if (hasSearchFilter) {
      filtered = filtered.filter((data) =>
        data.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [songs, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Song] as string;
      const second = b[sortDescriptor.column as keyof Song] as string;

      return sortDescriptor.direction === "ascending"
        ? String(first).localeCompare(String(second))
        : String(second).localeCompare(String(first));
    });
  }, [sortDescriptor, items]);

  const onSearchChange = (value?: string) => {
    setFilterValue(value || "");
    setPage(1);
  };

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  return {
    // Pagination, Sorting, Filtering
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortDescriptor,
    setSortDescriptor,
    filterValue,
    onSearchChange,
    onClear,

    // Selection & Columns
    selectedKeys,
    setSelectedKeys,
    visibleColumns,
    setVisibleColumns,
    headerColumns,

    // Processed Data
    sortedItems,
    totalSongs: songs.length,
    totalPages: pages,
  };
};
