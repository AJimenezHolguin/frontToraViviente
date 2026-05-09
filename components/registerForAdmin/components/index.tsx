"use client";

import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { ButtonComponent } from "@/shared/components/Button";
import { ColorButton } from "@/styles/colorButton.enum";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { PositionModal } from "@/shared/components/Modal/types";
import { UserRole } from "@/services/users/types";
import { createUserForAdmin } from "@/services/users/createUserForAdmin.service";
import { UserForm } from "@/shared/components/UserForm";
import { ModalRegisterForAdminProps } from "./types";

export const ModalRegisterForAdmin: React.FC<ModalRegisterForAdminProps> = ({
  isOpen,
  onClose,
  titleHeader = "Registrar nuevo usuario",
  message,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: UserRole.USER,
  });

  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await createUserForAdmin(form);

      setForm({
        name: "",
        email: "",
        password: "",
        role: UserRole.USER,
      });

      onClose();

      showConfirm(
        response.message || "Usuario creado exitosamente",
        () => {
          onSuccess?.();
        },
        {
          titleHeader: "¡Éxito!",
          showCancelButton: false,
        }
      );
    } catch (error: any) {
      showAlert("error", error?.message || "No se pudo crear el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        hideCloseButton
        backdrop="opaque"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        isOpen={isOpen}
        placement={PositionModal.CENTER}
        onOpenChange={(open) => !open && onClose()}
      >
        <ModalContent>
          <ModalHeader className="text-primary">{titleHeader}</ModalHeader>

          <ModalBody>
            <p className="whitespace-pre-line">{message}</p>
            <UserForm
              showRoleField
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </ModalBody>

          <ModalFooter>
            <ButtonComponent color={ColorButton.DANGER} onPress={onClose}>
              Cancelar
            </ButtonComponent>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertModal {...AlertModalProps} placement={PositionModal.CENTER} />

      <ConfirmModal {...ConfirmModalProps} titleButton="Cerrar" />
    </>
  );
};
