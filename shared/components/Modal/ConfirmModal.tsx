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
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent>
        <ModalHeader>Confirmación</ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={onConfirm} isLoading={isLoading} >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
