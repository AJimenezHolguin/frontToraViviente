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
import { createUserForAdmin } from "@/services/users/createUserForAdmin.service";
import { UserForm } from "@/shared/components/UserForm";
import { ModalRegisterForAdminProps } from "./types";
import { UserFormData } from "@/shared/components/UserForm/types";
import { RoleProps } from "@/types/roles.enum";

const initialFormState: UserFormData = {
  name: "",
  email: "",
  password: "",
  role: RoleProps.USER,
};

export const ModalRegisterForAdmin: React.FC<ModalRegisterForAdminProps> = ({
  isOpen,
  onClose,
  titleHeader = "Registrar nuevo usuario",
  message,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<UserFormData>(initialFormState);

  const resetForm = () => {
    setForm(initialFormState);
  };

  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      if (!form.role) {
        showAlert("error", "Debes seleccionar un rol");

        return;
      }

      const response = await createUserForAdmin({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      resetForm();
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
        onOpenChange={(open) => {
          if (!open) {
            resetForm();
            onClose();
          }
        }}
        classNames={{
          base: "gap-0 my-0 h-auto",
        }}
      >
        <ModalContent>
          <ModalHeader className="pb-0 text-primary">{titleHeader}</ModalHeader>

          <ModalBody className="flex flex-col gap-0">
            <p className="whitespace-pre-line">{message}</p>
            <UserForm
              showRoleField
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </ModalBody>

          <ModalFooter className="mt-0 mb-0 pt-0">
            <ButtonComponent
              fullWidth={true}
              color={ColorButton.DANGER}
              onPress={() => {
                resetForm();
                onClose();
              }}
            >
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
