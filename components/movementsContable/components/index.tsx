"use client";
import React, { useEffect, useState } from "react";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { useTable } from "@/shared/hooks/songs/useTable";
import { ReusableTable } from "@/shared/components/table";
import { WrapperTitle } from "@/shared/components/WrapperTitle";
import { SearchComponent } from "@/shared/components/Search";
import { getAllMovements } from "@/services/movements/getAllMovements.service";
import { Movements } from "@/types/movementsTypesProps";
import { movementColumns } from "@/shared/components/table/movementsColumn";
import { createActionColumn } from "@/shared/components/table/tableActionsColumn";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { PositionModal } from "@/shared/components/Modal/types";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { ButtonComponent } from "@/shared/components/Button";
import { ColorButton } from "@/styles/colorButton.enum";
import { PlusIcon } from "@/shared/components/table/TableIcons";
import { Text } from "@/shared/components/Text";
import AccountingModal from "@/shared/components/AccountingModal";
import { useDeleteMovement } from "@/shared/feature/movements/deleteMovementHandler";

export const AllMovements = () => {
  const [allMovements, setAllMovements] = useState<Movements[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovementToEdit, setSelectedMovementToEdit] =
    useState<Movements | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showConfirm, showAlert, AlertModalProps, ConfirmModalProps } =
    useModalAlert();

  const { handleDelete, loading } = useDeleteMovement(showAlert);

  const handleDeleteAction = (movement: Movements) => {
    showConfirm(
      `¿Estás seguro de que deseas anular el asiento contable "${movement.numReg}"?`,
      async (description?:string) => {
        await handleDelete(movement, description || "");
        fetchAllMoments();
      },
      {
        withInput: true,
        inputLabel:"motivo de anulación"
      }
    );
    fetchAllMoments();
  };

  const handleEditMovement = (movement: Movements) => {
    setSelectedMovementToEdit(movement);
    setIsModalOpen(true);
  };

  const columns = React.useMemo(
    () => [
      ...movementColumns,
      createActionColumn<Movements>({
        onEdit: handleEditMovement,
        onDelete: handleDeleteAction,
        editLabel: "Ajuste",
        deleteLabel: "Anular"
      }),
    ],
    [handleEditMovement]
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
  } = useTable<Movements>(columns);

  const fetchAllMoments = async () => {
    try {
      const movementsData = await getAllMovements({
        page,
        take: rowsPerPage ?? 5,
        order: sortDescriptor.direction === "ascending" ? "ASC" : "DESC",
        search: filterValue,
      });

      setIsLoading(true);
      setAllMovements(movementsData.data || []);
      setTotalPages(movementsData.metadata.pageCount);
      setTotalSongs(movementsData.metadata.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMoments();
  }, [page, rowsPerPage, sortDescriptor, filterValue]);

  const lastNumReg = allMovements.length
    ? Math.max(...allMovements.map((m) => m.numReg))
    : 0;

  const nextNumReg = lastNumReg + 1;

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <WrapperTitle title="Registro Contable General">
        <AccountingModal
          isOpen={isModalOpen}
          recordToEdit={selectedMovementToEdit}
          nextNumReg={nextNumReg}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedMovementToEdit(null);
          }}
          onSave={fetchAllMoments}
          />
        <ConfirmModal
          {...ConfirmModalProps}
          isLoading={loading}
          placement={PositionModal.CENTER}
          title={loading ? "Anulando..." : "Confirmar"}
        />

        <AlertModal {...AlertModalProps} placement={PositionModal.CENTER} />
        <div className="flex flex-col gap-6">
          <div className="flex justify-between gap-3 items-end">
            <SearchComponent
              placeholder="Buscar por número de asiento..."
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
                setSelectedMovementToEdit(null);
                setIsModalOpen(true);
              }}
            >
              <Text $fw={500} $v="md">
                Crear registro
              </Text>
            </ButtonComponent>
          </div>

          <ReusableTable<Movements>
            ariaLabel="Tabla de Movimientos"
            label="Asientos contables"
            rowsPerPage={rowsPerPage ?? 5}
            totalItems={totalSongs}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(1);
            }}
            headerColumns={headerColumns}
            itemKey="id"
            page={page}
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            sortedItems={allMovements}
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
