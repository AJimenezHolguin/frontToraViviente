import { Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon } from "./TableIcons";
import { TableColumnType } from "./types";

type ActionColumnOptions<T> = {
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
};

export const createActionColumn = <T,>({
  onEdit,onDelete,
}: ActionColumnOptions<T>): TableColumnType<T> => ({
  uid: "actions",
  name: "ACCIONES",
  align: "center",
  render: (data: T) => (
    <div className="relative flex justify-center items-center gap-2">
     {onEdit && (
      <Tooltip content="Editar">
        <button
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => onEdit(data)}
        >
          <EditIcon />
        </button>
      </Tooltip>
     )}
     {onDelete && (
      <Tooltip color="danger" content="Eliminar">
        <button
          className="text-lg text-danger cursor-pointer active:opacity-50"
          onClick={() => onDelete(data)}
        >
          <DeleteIcon />
        </button>
      </Tooltip>
      )}
    </div>
  ),
});

