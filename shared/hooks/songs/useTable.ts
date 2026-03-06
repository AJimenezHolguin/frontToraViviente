// import { useMemo, useState } from "react";
// import { Selection, SortDescriptor } from "@heroui/react";

// type Column = {
//   name: string;
//   uid: string;
//   sortable?: boolean;
// };

// export const useTable = (
//   baseColumnsSongs: Column[], 
//   includedColumnIds: string[],
//   customTitles?: Record<string, string>
// ) => {
//   const [filterValue, setFilterValue] = useState("");
//   const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
//   const [visibleColumns, setVisibleColumns] = useState<Selection>(
//     new Set(includedColumnIds)
//   );
//   const [rowsPerPage, setRowsPerPage] = useState<number | null>(null);
//   const [page, setPage] = useState(1);
//   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
//     column: includedColumnIds[0],
//     direction: "ascending",
//   });

//   const headerColumns = useMemo(() => {
//     const base = baseColumnsSongs
//       .filter((col) => includedColumnIds.includes(col.uid))
//       .map((col) => ({
//         ...col,
//         name: customTitles?.[col.uid] || col.name,
//       }));

//     if (visibleColumns === "all") return base;

//     return base.filter((column) =>
//       Array.from(visibleColumns).includes(column.uid)
//     );
//   }, [visibleColumns, includedColumnIds, customTitles, baseColumnsSongs]);

//   const onSearchChange = (value?: string) => {
//     setFilterValue(value || "");
//     setPage(1);
//   };

//   const onClear = () => {
//     setFilterValue("");
//     setPage(1);
//   };

//   return {
//     page,
//     setPage,
//     rowsPerPage,
//     setRowsPerPage,
//     sortDescriptor,
//     setSortDescriptor,
//     filterValue,
//     onSearchChange,
//     onClear,
//     selectedKeys,
//     setSelectedKeys,
//     visibleColumns,
//     setVisibleColumns,
//     headerColumns,
//   };
// };

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