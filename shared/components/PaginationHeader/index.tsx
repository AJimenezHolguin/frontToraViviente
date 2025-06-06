import { PaginationHeaderProps } from "./types";
import React from "react";
import { Text } from "@/shared/components/Text";


export const PaginationHeader:React.FC<PaginationHeaderProps> = ({
    totalItems,
    label,
    rowsPerPage ,
    onRowsPerPageChange,
}
) => {

return (
<div className="flex justify-between items-center">
      <Text className="text-small text-secondary">
        Total {totalItems} {label}
      </Text>
      <label className="flex items-center text-small text-secondary">
      {label} por página:
        <select
          className="bg-transparent outline-none text-small text-secondary"
          value={rowsPerPage ?? 0}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          <option selected={true} value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
    </div>
)
}