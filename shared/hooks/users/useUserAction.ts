import { useState } from "react";
import { AlertType } from "@/shared/components/Modal/types";
import { User } from "@/components/login/domain/models/user";

interface UseUserActionProps<T> {
  actionFn: (id: string) => Promise<T>;
  successMessage: string;
  errorMessage: string;
  showAlert: (type: AlertType, message: string) => void;
}

export const useUserAction = <T,>({
  actionFn,
  successMessage,
  errorMessage,
  showAlert,
}: UseUserActionProps<T>) => {
  const [loading, setLoading] = useState(false);

  const executeAction = async (user: User) => {
    try {
      setLoading(true);

      await actionFn(user.id);

      showAlert("success", successMessage);
    } catch (error: any) {
      showAlert(
        "error",
        error?.message || errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    executeAction,
    loading,
  };
};