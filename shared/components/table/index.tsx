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
import { ReusableTableProps } from "./types";

export const ReusableTable = <T extends { [key: string]: any }>({
  ariaLabel,
  headerColumns,
  sortedItems,
  itemKey,
  selectedKeys,
  onSelectionChange,
  sortDescriptor,
  onSortChange,
  renderCell,
  page,
  totalPages,
  onPageChange,
}: ReusableTableProps<T>) => {
  return (
    <Table
      isHeaderSticky
      aria-label={ariaLabel}
      bottomContent={
        <div className="py-2 px-2 flex z-0 justify-center items-center">
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
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      onSelectionChange={onSelectionChange}
      onSortChange={onSortChange}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent="No se encontraron resultados"
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item[itemKey] as React.Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
