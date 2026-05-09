export interface ModalRegisterForAdminProps {
    isOpen: boolean;
    onClose: () => void;
    titleHeader?: string;
    message?: string;
    onSuccess?: () => void;
  }