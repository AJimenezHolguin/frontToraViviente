import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { ConfirmModalProps } from "./types";

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  isLoading = false,
  title = "Confirmación",
  placement,
}) => {
  return (
    <Modal isOpen={isOpen} 
    placement={placement}
    onOpenChange={(open) => !open && onClose()} 
    >
      <ModalContent>
        <ModalHeader>Confirmación</ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" 
          isLoading={isLoading}
          onPress={onConfirm} 
          >
            { title }
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
