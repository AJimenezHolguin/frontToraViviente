import { AlertType } from "@/shared/components/Modal/types";

export interface UseUserActionProps<T> {
    actionFn: (id: string) => Promise<T>;
    successMessage: string;
    errorMessage: string;
    showAlert: (type: AlertType, message: string) => void;
  }