"use client";

import { useAccountingFormData } from "@/shared/hooks/movements/useAccountingFormData";
import { useAccountingValidation } from "@/shared/hooks/movements/useAccountingValidation";
import { Movements } from "@/types/movementsTypesProps";
import {
  CreateMovementRequest,
  CreateMovementResponse,
} from "@/services/typesServices";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  RadioGroup,
  Radio,
} from "@heroui/react";

import { saveMovementHandler } from "@/shared/feature/movements/saveMovementHandler";
import { useState } from "react";
import { MovementFormState } from "./types";
import { inputStyles, inputWithLabelStyles } from "@/styles/inputStyles";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  recordToEdit?: Movements | null;
  nextNumReg?: number;
  onSave?: (data: CreateMovementResponse) => void;
};

export default function AccountingModal({
  isOpen,
  onClose,
  recordToEdit,
  onSave,
}: Props) {
  const [loading, setLoading] = useState(false);

  const { form, setForm, initialForm, nextNumReg } = useAccountingFormData(
    isOpen,
    recordToEdit
  );

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      onClose();
    } catch (error) {
      console.error("Error saving movement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="opaque"
      size="sm"
      classNames={{
        wrapper: "flex items-center justify-center",
      }}
      style={{ margin: 0 }}
    >
      <ModalContent className="rounded-3xl">
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
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

              <Input
                type="date"
                label="Fecha"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                isDisabled={isEditing}
                classNames={inputWithLabelStyles}
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

              <Input
                type="text"
                label="Monto"
                placeholder="0.00"
                value={form.monto}
                onChange={(e) => handleChange("monto", e.target.value)}
                startContent={<span>$</span>}
                classNames={inputWithLabelStyles}
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
              <Button variant="flat" color="danger" onPress={onClose}>
                Cancelar
              </Button>

              <Button
                color="primary"
                type="submit"
                isDisabled={!isFormValid || loading}
              >
                {isEditing ? "Actualizar registro" : "Guardar registro"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
