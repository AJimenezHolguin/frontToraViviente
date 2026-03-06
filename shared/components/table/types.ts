import type { Selection, SortDescriptor } from "@heroui/react";

export interface TableColumnType<T> {
  uid: string;
  name: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface ReusableTableProps<T> {
  ariaLabel: string;
  headerColumns: TableColumnType<T>[];
  sortedItems: T[];
  totalItems?: number;
  label?: string;
  rowsPerPage?: number;
  onRowsPerPageChange? : (value: number) => void
  itemKey: keyof T;
  selectedKeys: Selection;
  onSelectionChange: (keys: Selection) => void;
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  // renderCell: (item: T, columnKey: string) => React.ReactNode;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
