"use client";

import { useEffect, useState } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

import { Form } from "@heroui/form";
import { ButtonComponent } from "../Button";
import { SelectedInput } from "../SeletedInput";
import { ColorButton } from "@/styles/colorButton.enum";
import { PositionModal } from "../Modal/types";
import { roleOptions } from "@/shared/constants/roleOptions";
import { changeUserRole } from "@/services/users/changeUserRole.service";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { AlertModal } from "../Modal/ModalAlert";
import { ConfirmModal } from "../Modal/ConfirmModal";
import { RoleProps } from "@/types/roles.enum";
import { ModalRoleChangeProps } from "./types";

export const ModalRoleChange: React.FC<ModalRoleChangeProps> = ({
  isOpen,
  onClose,
  userId,
  currentRole,
  onSuccess,
}) => {
  const [role, setRole] = useState<RoleProps>(currentRole);

  const [isLoading, setIsLoading] = useState(false);

  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();

  useEffect(() => {
    if (isOpen) {
      setRole(currentRole);
    }
  }, [isOpen, currentRole]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await changeUserRole({
        userId,
        newRole: role,
      });

      onClose();

      showConfirm(
        response.message,
        () => {
          onSuccess?.();
        },
        {
          titleHeader: "¡Éxito!",
          showCancelButton: false,
        }
      );
    } catch (error: any) {
      showAlert("error", error?.message || "No se pudo actualizar el rol");
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
            onClose();
          }
        }}
      >
        <ModalContent>
          <ModalHeader className="text-primary">
            Cambiar rol de usuario
          </ModalHeader>

          <ModalBody>
            <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <SelectedInput
                isRequired
                label="Rol del usuario"
                options={roleOptions}
                placeholder="Selecciona un rol"
                value={role}
                onChange={(value) => setRole(value as RoleProps)}
              />

              <ButtonComponent
                fullWidth
                color={ColorButton.PRIMARY}
                isLoading={isLoading}
                type="submit"
              >
                Actualizar rol
              </ButtonComponent>
            </Form>
          </ModalBody>

          <ModalFooter>
            <ButtonComponent
              fullWidth
              color={ColorButton.DANGER}
              onPress={onClose}
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
