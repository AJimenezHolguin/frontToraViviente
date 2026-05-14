import { RoleProps } from "@/types/roles.enum";

export type ModalRoleChangeProps = {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    onSuccess?: () => void;
    currentRole: RoleProps;
  };
  