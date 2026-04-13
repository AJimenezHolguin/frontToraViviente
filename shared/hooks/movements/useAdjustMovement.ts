import { useState } from "react";

import { AdjustMovementRequest } from "@/services/typesServices";
import { AlertType } from "@/shared/components/Modal/types";
import { adjustMovement } from "@/services/movements/adjustMovement.service";

export const useAdjustMovement = (
  showAlert: (type: AlertType, message: string) => void
) => {
  const [loading, setLoading] = useState(false);

  const handleAdjust = async (
    movementId: string,
    data: AdjustMovementRequest
  ) => {
    try {
      setLoading(true);

      const response = await adjustMovement(movementId, data);

      // ✅ usar mensaje del backend
      showAlert("success", response.message);

      return response.data; // 👈 útil si quieres refrescar UI
    } catch (error: any) {
      showAlert(
        "error",
        error?.message || "Error al ajustar el registro contable"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAdjust,
    loading,
  };
};