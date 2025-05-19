import type { Selection, SortDescriptor } from "@heroui/react";

interface TableColumnType {
  uid: string;
  name: string;
  sortable?: boolean;
}

export interface ReusableTableProps<T> {
  ariaLabel: string;
  headerColumns: TableColumnType[];
  sortedItems: T[];
  itemKey: keyof T;
  selectedKeys: Selection;
  onSelectionChange: (keys: Selection) => void;
  sortDescriptor: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  renderCell: (item: T, columnKey: string) => React.ReactNode;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
