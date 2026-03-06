import { useState } from "react";
import { Selection, SortDescriptor } from "@heroui/react";

type Column<T = any> = {
  uid: string;
  name: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
};

export const useTable = <T,>(columns: Column<T>[]) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(5);
  const [page, setPage] = useState(1);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: columns[0]?.uid ?? "",
    direction: "ascending",
  });

  const onSearchChange = (value?: string) => {
    setFilterValue(value || "");
    setPage(1);
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
    headerColumns: columns,
  };
};