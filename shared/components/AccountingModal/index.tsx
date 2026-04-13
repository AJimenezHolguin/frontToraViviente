"use client";

import { useAccountingFormData } from "@/shared/hooks/movements/useAccountingFormData";
import { useAccountingValidation } from "@/shared/hooks/movements/useAccountingValidation";
import { Movements } from "@/types/movementsTypesProps";
import {
  ApiResponse,
  CreateMovementRequest,

} from "@/services/typesServices";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  RadioGroup,
  Radio,
} from "@heroui/react";

import { saveMovementHandler } from "@/shared/feature/movements/saveMovementHandler";
import { useState } from "react";
import { MovementFormState } from "./types";
import { inputStyles } from "@/styles/inputStyles";
import { ColorButton } from "@/styles/colorButton.enum";
import { ButtonComponent } from "../Button";
import { VariantButtonProps } from "../Button/types";
import { InputComponent } from "../Input";
import { TypeProps} from '../Input/types';
import { useSession } from "next-auth/react";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { AlertModal } from "../Modal/ModalAlert";
import { PositionModal } from "../Modal/types";
import { ConfirmModal } from "../Modal/ConfirmModal";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  recordToEdit?: Movements | null;
  nextNumReg?: number;
  onSave?: (data: ApiResponse<Movements>) => void;
};

export default function AccountingModal({
  isOpen,
  onClose,
  recordToEdit,
  onSave,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { form, setForm, initialForm, nextNumReg } = useAccountingFormData(
    isOpen,
    recordToEdit
  );
  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();
  const { isFormValid } = useAccountingValidation(
    form,
    initialForm,
    recordToEdit
  );

  const isEditing = Boolean(recordToEdit);

  const handleChange = <K extends keyof MovementFormState>(
    key: K,
    value: MovementFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!session?.user) {
      showAlert("error", "No tienes permisos para crear el registro contable");

      return;
    }

    try {
      setLoading(true);

      const payload: CreateMovementRequest = {
        date: form.date,
        description: form.description,
        type: form.type,
        monto: parseFloat(form.monto),
      };

      const response = await saveMovementHandler({
        form: payload,
        recordToEdit,
      });
     
      onSave?.(response);
      showAlert("success", "Registro contable guardado correctamente");
      onClose();
      setTimeout(() => {
        onClose();
      
      }, 4000);
    } catch (error) {
      showAlert("error", "Error al guardar el registro contable");
    } finally {
      setLoading(false);
    }
  };


 

  return (
    <>
    <Modal
      backdrop="opaque"
      isDismissable={false}
      isOpen={isOpen}
      // onClose={onClose}
      placement={PositionModal.CENTER}
      size="sm"
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      classNames={{
        wrapper: "flex items-center justify-center",
        base: "rounded-1"
      }}
      style={{ margin: 0 }}
    >
      <ModalContent >
        {() => (
          <form >
            <ModalHeader className=" text-primary flex flex-col gap-1">
              <h2 className="text-2xl font-bold">
                {isEditing
                  ? "Ajuste Al Registro Contable"
                  : "Nuevo Registro Contable"}
              </h2>
              <p className="text-sm text-default-500">
                Complete los campos para la transacción.
              </p>
            </ModalHeader>

            <ModalBody 
             
            className="space-y-5">
              <div>
                <p className="text-xs font-bold uppercase text-default-400">
                  N° Registro
                </p>
                <p className="font-medium">
                  {recordToEdit?.numReg ?? nextNumReg}
                </p>
              </div>

              <InputComponent
                type={TypeProps.DATE}
                label="Fecha"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                isDisabled={isEditing}
                isReadOnly={isEditing}
                classNames={inputStyles}
              />

              <RadioGroup
                label="Tipo de Registro"
                orientation="horizontal"
                value={form.type}
                onValueChange={(val) =>
                  handleChange("type", val as MovementFormState["type"])
                }
                className="bg-default-100 p-1 rounded-2xl"
              >
                <Radio value="ingreso" className="flex-1 text-center">
                  Ingreso
                </Radio>
                <Radio value="gasto" className="flex-1 text-center">
                  Gasto
                </Radio>
              </RadioGroup>

              <InputComponent
                type={TypeProps.TEXT}
                label="Monto"
                placeholder="0.00"
                value={form.monto}
                onChange={(e) => handleChange("monto", e.target.value)}
                startContent={<span>$</span>}
                classNames={inputStyles}
              />

              <Textarea
                label="Descripción"
                placeholder="Ej: Pago de servicios de consultoría mensual"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                minRows={3}
                classNames={inputStyles}
                
              />
            </ModalBody>

            <ModalFooter>
              <ButtonComponent variant={VariantButtonProps.SOLID} color={ColorButton.DANGER} onPress={onClose}>
                Cancelar
              </ButtonComponent>

              <ButtonComponent
                color={ColorButton.PRIMARY}
                isDisabled={!isFormValid || loading}
                onPress={() =>
                  showConfirm(
                    isEditing
                      ? "¿Estás seguro de que deseas actualizar el registro contable?"
                      : "¿Estás seguro de que deseas crear el registro contable?",
                    handleSave
                  )
                }
              >
                {isEditing ? "Actualizar registro" : "Guardar registro"}
              </ButtonComponent>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
    <AlertModal {...AlertModalProps} placement={PositionModal.CENTER} />
    <ConfirmModal
        {...ConfirmModalProps}
        isLoading={loading}
        placement={PositionModal.CENTER}
        title={
          loading
            ? isEditing
              ? "Actualizando..."
              : "Guardando..."
            : isEditing
              ? "Actualizar"
              : "Guardar"
        }
      />
   </>     
  );
}
