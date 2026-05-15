import { Tooltip } from "@heroui/react";
import {
  ActivateUserIcon,
  ChangeUserRoleIcon,
  DeleteIcon,
  DisableUserIcon,
  EditIcon,
  TemporaryPasswordIcon,
} from "./TableIcons";
import { ActionColumnOptions, TableColumnType } from "./types";

export const createActionColumn = <T,>({
  onEdit,
  onDelete,
  onTemporaryPassword,
  onChangeUserRole,
  onActivateUser,
  onDisableUser,
  isActive,
  editLabel = "Editar",
  deleteLabel = "Eliminar",
  changeUserRoleLabel = "Cambiar rol de usuario",
  activateUserLabel = "Activar usuario",
  disableUserLabel = "Desactivar usuario",
  changePasswordLabel = "Asignar contraseña temporal",
}: ActionColumnOptions<T>): TableColumnType<T> => ({
  uid: "actions",
  name: "ACCIONES",
  align: "center",
  render: (data: T) => {
    const isActiveStatus = isActive?.(data);

    return (
      <div className="relative flex justify-center items-center gap-2">
        {onEdit && (
          <Tooltip content={editLabel}>
            <button
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => onEdit(data)}
            >
              <EditIcon />
            </button>
          </Tooltip>
        )}

        {onDelete && (
          <Tooltip color="danger" content={deleteLabel}>
            <button
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => onDelete(data)}
            >
              <DeleteIcon />
            </button>
          </Tooltip>
        )}

        {onChangeUserRole && (
          <Tooltip
            color="foreground"
            content={
              isActiveStatus === false
                ? "No se puede cambiar el rol de un usuario deshabilitado"
                : changeUserRoleLabel
            }
          >
            <button
              disabled={isActiveStatus === false}
              className={`
            text-lg transition-opacity
            ${
              isActiveStatus === false
                ? "text-light_gray cursor-not-allowed opacity-30"
                : "text-cafe cursor-pointer active:opacity-50"
            }
           `}
              onClick={() => {
                if (isActiveStatus !== false) {
                  onChangeUserRole(data);
                }
              }}
            >
              <ChangeUserRoleIcon />
            </button>
          </Tooltip>
        )}

        {onTemporaryPassword && (
          <Tooltip
            color="primary"
            content={
              isActiveStatus === false
                ? "No se puede asignar contraseña temporal a un usuario deshabilitado"
                : changePasswordLabel
            }
          >
            <button
              disabled={isActiveStatus === false}
              className={`
            text-lg transition-opacity
            ${
              isActiveStatus === false
                ? "text-light_gray cursor-not-allowed opacity-30"
                : "text-primary cursor-pointer active:opacity-50"
            }
           `}
              onClick={() => {
                if (isActiveStatus !== false) {
                  onTemporaryPassword(data);
                }
              }}
            >
              <TemporaryPasswordIcon />
            </button>
          </Tooltip>
        )}

        {onActivateUser && (
          <Tooltip
            color="secondary"
            content={
              isActiveStatus ? "El usuario ya está activo" : activateUserLabel
            }
          >
            <button
              disabled={isActiveStatus}
              className={`
        text-lg
        transition-opacity
        ${
          isActiveStatus
            ? "text-light_gray cursor-not-allowed opacity-30"
            : "text-secondary cursor-pointer active:opacity-50"
        }
      `}
              onClick={() => {
                if (!isActiveStatus) {
                  onActivateUser(data);
                }
              }}
            >
              <ActivateUserIcon />
            </button>
          </Tooltip>
        )}

        {onDisableUser && (
          <Tooltip
            color="danger"
            content={
              isActiveStatus === false
                ? "El usuario ya está deshabilitado"
                : disableUserLabel
            }
          >
            <button
              disabled={isActiveStatus === false}
              className={`
        text-lg transition-opacity
        ${
          isActiveStatus === false
            ? "text-light_gray cursor-not-allowed opacity-30"
            : "text-danger cursor-pointer active:opacity-50"
        }
      `}
              onClick={() => {
                if (isActiveStatus !== false) {
                  onDisableUser(data);
                }
              }}
            >
              <DisableUserIcon />
            </button>
          </Tooltip>
        )}
      </div>
    );
  },
});
