import { AlertType } from "@/shared/components/Modal/types";
import { RoleProps } from "@/types/roles.enum";

export interface UseUserActionProps<T> {
    actionFn: (id: string) => Promise<T>;
    successMessage: string;
    errorMessage: string;
    showAlert: (type: AlertType, message: string) => void;
  }

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role?: RoleProps;
}

export interface UserFormProps {
  form: UserFormData;
  setForm: React.Dispatch<React.SetStateAction<UserFormData>>;
  showRoleField?: boolean;
  isLoading?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
