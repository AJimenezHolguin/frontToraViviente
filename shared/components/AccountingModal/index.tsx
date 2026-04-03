"use client";

import { useAccountingFormData } from "@/shared/hooks/movements/useAccountingFormData";
import { useAccountingValidation } from "@/shared/hooks/movements/useAccountingValidation";
import { Movements } from "@/types/movementsTypesProps";
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

// ---- Types ----
export type AccountingRecord = {
  id?: string;
  date: string;
  type: "ingreso" | "gasto";
  monto: string;
  description: string;
};

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  recordToEdit?: Movements | null ;
  nextNumReg?: number;
  onSave?: (data: AccountingRecord) => void;
};

export default function AccountingModal({
  isOpen,
  onClose,
  recordToEdit,
  nextNumReg,
  onSave,
}: Props) {

  const { form, setForm, initialForm } = useAccountingFormData(
    isOpen,
    recordToEdit
  );
  
  const { isFormValid } = useAccountingValidation(
    form,
    initialForm,
    recordToEdit
  );
  
  // 🔥 CLAVE: depender del estado interno, no de la prop
  const isEditing = Boolean(initialForm);

  const handleChange = <K extends keyof AccountingRecord>(
    key: K,
    value: AccountingRecord[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave?.(form);
  };

  return (
    <Modal  
      isOpen={isOpen} 
      onClose={onClose} 
      backdrop="blur" 
      size="sm" 
      classNames={{
        wrapper: "flex items-center justify-center",
      }}
      style={{
        margin: 0,
      }}
    >
      <ModalContent className="rounded-3xl">
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">
                {isEditing
                  ? "Editar Registro Contable"
                  : "Nuevo Registro Contable"}
              </h2>
              <p className="text-sm text-default-500">
                Complete los campos para la transacción.
              </p>
            </ModalHeader>

            <ModalBody className="space-y-5">
              
              {/* Record ID */}
              <div>
                <p className="text-xs font-bold uppercase text-default-400">
                  N° Registro
                </p>
                <p className="font-medium">
                  {recordToEdit?.numReg ?? nextNumReg }
                </p>
              </div>

              {/* Date */}
              <Input
                type="date"
                label="Fecha"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />

              {/* Type */}
              <RadioGroup
                label="Tipo de Registro"
                orientation="horizontal"
                value={form.type}
                onValueChange={(val) =>
                  handleChange("type", val as AccountingRecord["type"])
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

              {/* Amount */}
              <Input
                type="text"
                label="Monto"
                placeholder="0.00"
                value={form.monto}
                onChange={(e) => handleChange("monto", e.target.value)}
                startContent={<span>$</span>}
              />

              {/* Description */}
              <Textarea
                label="Descripción"
                placeholder="Ej: Pago de servicios de consultoría mensual"
                value={form.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                minRows={3}
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" color="danger" onPress={onClose}>
                Cancelar
              </Button>

              <Button 
                color="primary" 
                type="submit"
                isDisabled={!isFormValid}
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