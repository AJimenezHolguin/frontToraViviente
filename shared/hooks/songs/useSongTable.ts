import { useMemo, useState } from "react";
import { Selection, SortDescriptor } from "@heroui/react";
import { baseColumns } from "@/shared/components/table/columnsAndStatusOptions";

export const useSongTable = (
  includedColumnIds: string[] = [
    "name",
    "user",
    "linkSong",
    "category",
    "fileSong",
    "fileScore",
    "actions",
  ],
  customTitles?: Record<string, string>
) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(includedColumnIds)
  );
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const headerColumns = useMemo(() => {
    const base = baseColumns
      .filter((col) => includedColumnIds.includes(col.uid))
      .map((col) => ({
        ...col,
        name: customTitles?.[col.uid] || col.uid.toUpperCase(),
      }));

    if (visibleColumns === "all") return base;

    return base.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, includedColumnIds, customTitles]);

  const onSearchChange = (value?: string) => {
    setFilterValue(value || "");
    setPage(1); // Reset page when searching
  };

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  return {
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
    visibleColumns,
    setVisibleColumns,
    headerColumns,
  };
};
