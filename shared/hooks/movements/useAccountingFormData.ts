import { Movements } from "@/types/movementsTypesProps";
import { useState, useEffect } from 'react';

export const useAccountingFormData = (
    isOpen: boolean,
    recordToEdit?: Movements | null
  ) => {
    const emptyForm = {
      date: "",
      type: "ingreso" as "ingreso" | "gasto",
      monto: "",
      description: "",
    };
  
    const [form, setForm] = useState(emptyForm);
    const [initialForm, setInitialForm] = useState<typeof emptyForm | null>(null);
  
    useEffect(() => {
      if (isOpen && recordToEdit?.id) {
        // 🔥 NORMALIZACIÓN INTERNA (NO mapper externo)
        const monto =
          recordToEdit.monto ??
          (recordToEdit.type === "ingreso"
            ? String(recordToEdit.ingreso || "")
            : String(recordToEdit.gasto || ""));
  
        const updatedForm = {
          date: recordToEdit.date || "",
          type: recordToEdit.type as "ingreso" | "gasto",
          monto,
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