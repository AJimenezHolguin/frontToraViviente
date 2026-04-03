import { Movements } from "@/types/movementsTypesProps";
import { useEffect,useState } from 'react';

export const useAccountingValidation = (
    form: any,
    initialForm: any,
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
      if (recordToEdit) {
        setIsFormValid(isFormModified());
      } else {
        setIsFormValid(
          !!form.date && !!form.monto && !!form.description
        );
      }
    }, [form, initialForm, recordToEdit]);
  
    return { isFormValid };
  };