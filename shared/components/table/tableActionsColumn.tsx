import { Tooltip } from "@heroui/react";
import { EditIcon } from "./TableIcons";
import { TableColumnType } from "./types";

type ActionColumnOptions<T> = {
  onEdit?: (item: T) => void;
};

export const createActionColumn = <T,>({
  onEdit,
}: ActionColumnOptions<T>): TableColumnType<T> => ({
  uid: "actions",
  name: "ACCIONES",
  render: (data: T) => (
    <div className="relative flex justify-center items-center gap-2">
      <Tooltip content="Editar">
        <button
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => onEdit && onEdit(data)}
        >
          <EditIcon />
        </button>
      </Tooltip>
    </div>
  ),
});

