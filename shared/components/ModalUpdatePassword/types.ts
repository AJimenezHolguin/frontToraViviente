import { User } from "@/components/login/domain/models/user";
import { PositionModal } from "../Modal/types";

export interface ModalUpdatePasswordProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    selectedUser: User| null;
    titleHeader?: string;
    titleButton?: string;
    placement?:PositionModal;
    showCancelButton?: boolean;
}