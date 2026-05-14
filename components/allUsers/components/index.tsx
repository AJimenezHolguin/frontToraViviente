"use client";
import React, { useEffect, useState } from "react";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { useTable } from "@/shared/hooks/songs/useTable";
import { ReusableTable } from "@/shared/components/table";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";
import { createActionColumn } from "@/shared/components/table/tableActionsColumn";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { PositionModal } from "@/shared/components/Modal/types";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { ButtonComponent } from "@/shared/components/Button";
import { ColorButton } from "@/styles/colorButton.enum";
import { PlusIcon } from "@/shared/components/table/TableIcons";
import { Text } from "@/shared/components/Text";
import { User } from "@/components/login/domain/models/user";
import { usersColumns } from "@/shared/components/table/usersColumn";
import { getAllUsers } from "@/services/users/getAllUsers.service";
import { useUserAction } from "@/shared/hooks/users/useUserAction";
import { reactivateUser } from "@/services/users/patchReactiveUser.service";
import { desactiveUser } from "@/services/users/desactiveUser.service";
import { ModalUpdatePassword } from "@/shared/components/ModalUpdatePassword";
import { ModalRegisterForAdmin } from "@/components/registerForAdmin/components";
import { ModalRoleChange } from "@/shared/components/ModalRoleChange";
import { UserRole } from "@/services/users/types";

export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserToEdit, setSelectedUserToEdit] = useState<User | null>(
    null
  );
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

const [selectedUserRole, setSelectedUserRole] = useState<User | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRegisterUserOpen, setIsModalRegisterUserOpen] = useState(false);

  const { showConfirm, showAlert, AlertModalProps, ConfirmModalProps } =
    useModalAlert();

  const { executeAction: handleReactive, loading: loadingReactiveUser } =
    useUserAction({
      actionFn: reactivateUser,
      successMessage: "Usuario reactivado correctamente",
      errorMessage: "Error al reactivar usuario",
      showAlert,
    });

  const { executeAction: handleDesactive, loading: loadingDesactiveUser } =
    useUserAction({
      actionFn: desactiveUser,
      successMessage: "Usuario desactivado correctamente",
      errorMessage: "Error al desactivar usuario",
      showAlert,
    });

  const handleUserAction = (
    user: User,
    action: () => Promise<void>,
    message: string
  ) => {
    showConfirm(message, async () => {
      await action();
      fetchAllUsers();
    });
  };

  const handleTemporyPassword = (user: User) => {
    setSelectedUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleChangeRole = (user: User) => {

    setSelectedUserRole(user);
  
    setIsRoleModalOpen(true);
  
  };

  const columns = React.useMemo(
    () => [
      ...usersColumns,
      createActionColumn<User>({
        onChangeUserRole: handleChangeRole,
        onTemporaryPassword: handleTemporyPassword,

        onActivateUser: (user) =>
          handleUserAction(
            user,
            () => handleReactive(user),
            "¿Desea reactivar el usuario?"
          ),

        onDisableUser: (user) =>
          handleUserAction(
            user,
            () => handleDesactive(user),
            "¿Desea desactivar el usuario?"
          ),
        changeUserRoleLabel: "Cambiar rol de usuario",
        changePasswordLabel: "Asignar contraseña temporal",
        activateUserLabel: "Activar usuario",
        disableUserLabel: "Desactivar usuario",
        isActive: (user) => user.isActive || false,
      }),
    ],
    []
  );
  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortDescriptor,
    setSortDescriptor,
    filterValue,
    onSearchChange,
    onClear,
    selectedKeys,
    setSelectedKeys,
    headerColumns,
  } = useTable<User>(columns);

  const fetchAllUsers = async () => {
    try {
      const usersData = await getAllUsers({
        page,
        take: rowsPerPage ?? 5,
        order: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
        search: filterValue,
      });

      setIsLoading(true);
      setAllUsers(usersData.data || []);
      setTotalPages(usersData.metadata.pageCount);
      setTotalUsers(usersData.metadata.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [page, rowsPerPage, sortDescriptor, filterValue]);

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <WrapperTitle title="Control de usuarios">
      <ModalRoleChange
      isOpen={isRoleModalOpen}
      onClose={() => {
      setIsRoleModalOpen(false);
      setSelectedUserRole(null);
      }}
      userId={selectedUserRole?.id || ""}
      currentRole={
      ((selectedUserRole?.role as unknown) as UserRole) || UserRole.USER
      }
      onSuccess={fetchAllUsers}
/>
        <ModalUpdatePassword
          titleHeader="Asignar contraseña temporal"
          isOpen={isModalOpen}
          selectedUser={selectedUserToEdit}
          message={`¿Desea asignar una contraseña temporal al usuario:\n${selectedUserToEdit?.name}?`}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUserToEdit(null);
          }}
        />
        <ModalRegisterForAdmin
          titleHeader="Registrar nuevo usuario"
          isOpen={isModalRegisterUserOpen}
          message={"¡Completa la información del nuevo usuario a crear! "}
          onClose={() => {
            setIsModalRegisterUserOpen(false);
          }}
          onSuccess={fetchAllUsers}
        />

        <ConfirmModal
          {...ConfirmModalProps}
          isLoading={loadingReactiveUser || loadingDesactiveUser}
          placement={PositionModal.CENTER}
          titleButton={loadingReactiveUser ? "Anulando..." : "Confirmar"}
        />

        <AlertModal {...AlertModalProps} placement={PositionModal.CENTER} />
        <div className="flex flex-col gap-6">
          <div className="flex justify-between gap-3 items-end">
            <SearchComponent
              placeholder="Buscar por nombre de usuario..."
              classNames={{
                base: "w-full pb-4 text-secondary sm:max-w-[33%] pb-2",
                input: "placeholder:text-secondary ",
                inputWrapper: "bg-white ",
              }}
              value={filterValue}
              onClear={onClear}
              onValueChange={onSearchChange}
            />
            <ButtonComponent
              color={ColorButton.PRIMARY}
              endContent={<PlusIcon />}
              onPress={() => {
                setIsModalRegisterUserOpen(true);
              }}
            >
              <Text $fw={500} $v="md">
                Crear usuario
              </Text>
            </ButtonComponent>
          </div>

          <ReusableTable<User>
            ariaLabel="Tabla de Usuarios"
            label="Usuarios registrados"
            rowsPerPage={rowsPerPage ?? 5}
            totalItems={totalUsers}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(1);
            }}
            headerColumns={headerColumns}
            itemKey="id"
            page={page}
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            sortedItems={allUsers}
            totalPages={totalPages}
            onPageChange={setPage}
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          />
        </div>
      </WrapperTitle>
    </>
  );
};
