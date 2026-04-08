import { MovementFormState } from "./../../components/AccountingModal/types";
import { Movements } from "@/types/movementsTypesProps";
import { useState, useEffect } from "react";

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
    if (isOpen && recordToEdit?.id) {
    
      const updatedForm: MovementFormState = {
        date: recordToEdit.date || "",
        type: recordToEdit.type as "ingreso" | "gasto",
        monto: recordToEdit.monto?.toString() ?? "",
        description: recordToEdit.description || "",
      };

      setForm(updatedForm);
      setInitialForm(updatedForm);
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
