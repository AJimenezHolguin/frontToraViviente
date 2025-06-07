import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { AlertModalProps } from "./types";
import { Text } from "../Text";
import { ButtonComponent } from "../Button";
import { ColorButton } from "@/styles/colorButton.enum";

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  type,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent>
        <ModalHeader className="text-primary">{type === "success" ? "¡Éxito!" : "Error"}</ModalHeader>
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <ButtonComponent color={ColorButton.PRIMARY} onPress={onClose}>
            Cerrar
          </ButtonComponent>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
