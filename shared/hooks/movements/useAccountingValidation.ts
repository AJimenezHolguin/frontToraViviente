import { MovementFormState } from "@/shared/components/AccountingModal/types";
import { Movements } from "@/types/movementsTypesProps";
import { useEffect, useState } from "react";

export const useAccountingValidation = (
  form: MovementFormState,
  initialForm: MovementFormState | null,
  recordToEdit?: Movements | null
) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const isFormModified = () => {
    if (!initialForm) return false;

    return (
      form.date !== initialForm.date ||
      form.type !== initialForm.type ||
      form.monto !== initialForm.monto ||
      form.description !== initialForm.description
    );
  };

  useEffect(() => {
    const montoNumber = parseFloat(form.monto);

    const baseValidation =
      !!form.date && !!form.description.trim() && !isNaN(montoNumber);

    if (recordToEdit) {
      setIsFormValid(baseValidation && isFormModified());
    } else {
      setIsFormValid(baseValidation);
    }
  }, [form, initialForm, recordToEdit]);

  return { isFormValid };
};
