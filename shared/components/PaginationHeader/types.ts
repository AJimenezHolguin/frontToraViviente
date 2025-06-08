export interface PaginationHeaderProps {
    totalItems: number;
    label: "canciones" | "playlists" | string;
    rowsPerPage: number;
    onRowsPerPageChange: (value: number) => void;
  }