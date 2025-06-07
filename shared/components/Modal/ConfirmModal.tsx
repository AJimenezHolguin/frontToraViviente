import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { ConfirmModalProps } from "./types";
import { Text } from "../Text";
import { ButtonComponent } from "../Button";
import { ColorButton } from "@/styles/colorButton.enum";

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
        <ModalHeader className="text-primary ">Confirmación</ModalHeader>
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <ButtonComponent 
            color={ColorButton.DANGER} 
            onPress={onClose}>
            Cancelar
          </ButtonComponent>
          <ButtonComponent 
            color={ColorButton.PRIMARY}  
            isLoading={isLoading}
            onPress={onConfirm} 
          >
            { title }
          </ButtonComponent>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
