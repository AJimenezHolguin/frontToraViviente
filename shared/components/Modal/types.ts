import { Song } from "@/types/SongsTypesProps";


export interface ModalSongProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onClose: () => void;
    onSongCreated: () => void;
    songToEdit?: Song | null;
}


type AlertType = "success" | "error";

export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: AlertType;
    message: string;
    
  
  }

  export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    isLoading?: boolean;
  }