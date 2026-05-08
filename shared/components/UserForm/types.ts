import { UserRole } from "@/services/users/types";

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }

export interface UserFormProps {
  form: UserFormData;
  setForm: React.Dispatch<
    React.SetStateAction<UserFormData>
  >;

  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;

  isLoading?: boolean;

  showRoleField?: boolean;
}