import type { Selection, SortDescriptor } from "@heroui/react";

export interface TableColumnType<T> {
  uid: string;
  name: string;
  sortable?: boolean;
  align?: "start" | "center" | "end";
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
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export type ActionColumnOptions<T> = {
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onTemporaryPassword?: (item: T) => void;
  onChangeUserRole?: (item: T) => void;
  onActivateUser?: (item: T) => void;
  onDisableUser?: (item: T) => void;
  editLabel?: string;
  deleteLabel?: string;
  changePasswordLabel?: string;
  changeUserRoleLabel?: string;
  activateUserLabel?: string;
  disableUserLabel?: string;
  isActive?: (item: T) => boolean;
};

