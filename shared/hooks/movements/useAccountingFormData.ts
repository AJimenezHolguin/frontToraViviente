import { Movements } from "@/types/movementsTypesProps";
import { useState, useEffect } from "react";
import { getMovementById } from "@/services/movements/getMovementById.service";
import { MovementFormState } from "@/shared/components/AccountingModal/types";

export const useAccountingFormData = (
  isOpen: boolean,
  recordToEdit?: Movements | null
) => {
  const emptyForm: MovementFormState = {
    date: "",
    type: "ingreso",
    monto: "",
    description: "",
  };

  const [form, setForm] = useState<MovementFormState>(emptyForm);
  const [initialForm, setInitialForm] = useState<MovementFormState | null>(
    null
  );

  useEffect(() => {
    const fetchMovement = async () => {
      if (!recordToEdit?.id) return;

      try {
        const movement = await getMovementById(recordToEdit.id);

        const updatedForm: MovementFormState = {
          date: movement.date || "",
          type: movement.type as "ingreso" | "gasto",
          monto: movement.monto?.toString() ?? "",
          description: movement.description || "",
        };

        setForm(updatedForm);
        setInitialForm(updatedForm);
      } catch (error) {
        console.error("Error loading movement:", error);
      }
    };

    if (isOpen && recordToEdit) {
      fetchMovement();
    }
  }, [isOpen, recordToEdit]);

  useEffect(() => {
    if (isOpen && !recordToEdit) {
      setForm(emptyForm);
      setInitialForm(null);
    }
  }, [isOpen, recordToEdit]);

  const isFormModified = () => {
    if (!initialForm) return false;

    return (
      form.date !== initialForm.date ||
      form.type !== initialForm.type ||
      form.monto !== initialForm.monto ||
      form.description !== initialForm.description
    );
  };

  return {
    form,
    setForm,
    initialForm,
    isFormModified,
  };
};
