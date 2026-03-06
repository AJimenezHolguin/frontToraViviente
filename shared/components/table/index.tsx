// "use client";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Pagination,
// } from "@heroui/react";

// import React from "react";
// import { Text } from "@/shared/components/Text";
// import { ReusableTableProps } from "./types";



// export const ReusableTable = <T extends Record<string, any>>({
//   ariaLabel,
//   totalItems,
//   label,
//   rowsPerPage,
//   onRowsPerPageChange,
//   headerColumns,
//   sortedItems,
//   itemKey,
//   selectedKeys,
//   onSelectionChange,
//   sortDescriptor,
//   onSortChange,
//   // renderCell,
//   page,
//   totalPages,
//   onPageChange,
// }: ReusableTableProps<T>) => {
//   return (
//     <div className="flex flex-col gap-4">

//       {/* 🔹 Header superior opcional */}
//       {totalItems !== undefined &&
//         label &&
//         rowsPerPage !== undefined &&
//         onRowsPerPageChange && (
//           <div className="flex justify-between items-center">
//             <Text className="text-small text-secondary">
//               Total {totalItems} {label}
//             </Text>

//             <label className="flex items-center text-small text-secondary">
//               {label} por página:
//               <select
//                 className="bg-transparent outline-none text-small text-secondary"
//                 value={rowsPerPage}
//                 onChange={(e) =>
//                   onRowsPerPageChange(Number(e.target.value))
//                 }
//               >
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="15">15</option>
//               </select>
//             </label>
//           </div>
//         )}

//       {/* 🔹 Tabla */}
//       <Table
//         isHeaderSticky
//         isVirtualized
//         aria-label={ariaLabel}
//         bottomContent={
//           <div className="py-2 px-2 flex justify-center items-center">
//             <Pagination
//               isCompact
//               showControls
//               showShadow
//               boundaries={1}
//               color="primary"
//               page={page}
//               siblings={1}
//               total={totalPages}
//               onChange={onPageChange}
//             />
//           </div>
//         }
//         bottomContentPlacement="outside"
//         maxTableHeight={290}
//         rowHeight={40}
//         selectedKeys={selectedKeys}
//         sortDescriptor={sortDescriptor}
//         onSelectionChange={onSelectionChange}
//         onSortChange={onSortChange}
//       >
//         <TableHeader columns={headerColumns}>
//           {(column) => (
//             <TableColumn
//               key={column.uid}
//               align={
//                 ["fileSong", "fileScore", "actions"].includes(column.uid)
//                   ? "center"
//                   : "start"
//               }
//               allowsSorting={column.sortable}
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>

//         <TableBody
//   emptyContent="No se encontraron resultados"
//   items={sortedItems}
// >
//   {(item) => (
//     <TableRow key={item[itemKey] as React.Key}>
//       {(columnKey) => {

//         const column = headerColumns.find(
//           col => col.uid === columnKey
//         );

//         return (
//           <TableCell>
//             {column?.render
//               ? column.render(item)
//               : String(item[columnKey as keyof T])
//             }
//           </TableCell>
//         );
//       }}
//     </TableRow>
//   )}
// </TableBody>
//       </Table>
//     </div>
//   );
// };

"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";

import React from "react";
import { Text } from "@/shared/components/Text";
import { ReusableTableProps } from "./types";

export const ReusableTable = <T extends Record<string, any>>({
  ariaLabel,
  totalItems,
  label,
  rowsPerPage,
  onRowsPerPageChange,
  headerColumns,
  sortedItems,
  itemKey,
  selectedKeys,
  onSelectionChange,
  sortDescriptor,
  onSortChange,
  page,
  totalPages,
  onPageChange,
}: ReusableTableProps<T>) => {
  return (
    <div className="flex flex-col gap-4">

      {/* Header superior */}
      {totalItems !== undefined &&
        label &&
        rowsPerPage !== undefined &&
        onRowsPerPageChange && (
          <div className="flex justify-between items-center">
            <Text className="text-small text-secondary">
              Total {totalItems} {label}
            </Text>

            <label className="flex items-center text-small text-secondary gap-2">
              {label} por página:
              <select
                className="bg-transparent outline-none text-small text-secondary"
                value={rowsPerPage}
                onChange={(e) =>
                  onRowsPerPageChange(Number(e.target.value))
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </label>
          </div>
        )}

      {/* Tabla */}
      <Table
        isHeaderSticky
        isVirtualized
        aria-label={ariaLabel}
        maxTableHeight={290}
        rowHeight={40}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        onSelectionChange={onSelectionChange}
        onSortChange={onSortChange}
        bottomContent={
          <div className="py-2 px-2 flex justify-center items-center">
            <Pagination
              isCompact
              showControls
              showShadow
              boundaries={1}
              color="primary"
              page={page}
              siblings={1}
              total={totalPages}
              onChange={onPageChange}
            />
          </div>
        }
        bottomContentPlacement="outside"
      >

        {/* Header */}
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.sortable}
              align={column.align || "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        {/* Body */}
        <TableBody
          items={sortedItems}
          emptyContent="No se encontraron resultados"
        >
          {(item) => (
            <TableRow key={String(item[itemKey])}>
              {(columnKey) => {
                const column = headerColumns.find(
                  (col) => col.uid === columnKey
                );

                const content = column?.render
                  ? column.render(item)
                  : String(item[columnKey as keyof T] ?? "");

                return (
                  <TableCell>
                    {content}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
  );
};