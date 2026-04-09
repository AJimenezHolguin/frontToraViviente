import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
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
  withInput = false,
  inputLabel
}) => {

  const [inputValue, setInputValue] = useState("");
 
  return (
    <Modal
      backdrop="opaque"
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      isOpen={isOpen}
      placement={placement}
      onOpenChange={(open) => !open && onClose()}
    >
      <ModalContent>
        <ModalHeader className="text-primary ">Confirmación</ModalHeader>
        <ModalBody>
          <Text>{message}</Text>
          {withInput && (
          <Textarea
           label={inputLabel || "Descripción"}
            placeholder="Escribe el motivo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
             minRows={3}
          />
  )}
        </ModalBody>
        <ModalFooter>
          <ButtonComponent color={ColorButton.DANGER} onPress={onClose}>
            Cancelar
          </ButtonComponent>
          <ButtonComponent
            color={ColorButton.PRIMARY}
            isLoading={isLoading}
            onPress={() => onConfirm(inputValue)}
          >
            {title}
          </ButtonComponent>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
