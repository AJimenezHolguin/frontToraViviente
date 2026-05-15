import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

import { ButtonComponent } from "../Button";
import { ColorButton } from "@/styles/colorButton.enum";
import { ConfirmModalProps, PositionModal } from "../Modal/types";
import { InputComponent, PasswordToggleIcon } from "../Input";
import { InputClassNameKeys } from "@/types/classNamesKeys";
import { LabelPlacementProps, TypeProps, VariantProps } from "../Input/types";
import { RadiusProps } from "@/types/radius.enum";
import { Form } from "@heroui/form";

import { resetPasswordForAdmin } from "@/services/users/resetPasswordForAdmin.service";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { ConfirmModal } from "../Modal/ConfirmModal";
import { AlertModal } from "../Modal/ModalAlert";
import { ModalUpdatePasswordProps } from "./types";

export const ModalUpdatePassword: React.FC<ModalUpdatePasswordProps> = ({
  isOpen,
  onClose,
  message,
  selectedUser,
  titleHeader = "Confirmación",
  titleButton = "Confirmar",
  placement,
  showCancelButton = true,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prev) => !prev);

  const handleSubmit = async () => {
    if (password.trim() !== confirmPassword.trim()) {
      showAlert("error", "Las contraseñas no coinciden");

      return;
    }

    if (!selectedUser?.email) {
      showAlert("error", "No se encontró el correo del usuario");

      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPasswordForAdmin({
        email: selectedUser.email,
        newPassword: password,
      });

      setPassword("");
      setConfirmPassword("");

      onClose();
      showConfirm(response.message, () => {}, {
        showCancelButton: false,
        titleHeader: "¡Éxito!",
      });
    } catch (error: any) {
      showAlert(
        "error",
        error?.message || "No se pudo actualizar la contraseña"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        hideCloseButton
        backdrop="opaque"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        isOpen={isOpen}
        placement={placement}
        onOpenChange={(open) => !open && onClose()}
      >
        <ModalContent>
          <ModalHeader className="text-primary">{titleHeader}</ModalHeader>

          <ModalBody>
            <p className="whitespace-pre-line">{message}</p>

            <div className="h-full bg-surface-container-lowest rounded-xl shadow p-1 md:p-4 border">
              <Form onSubmit={handleSubmit} className="space-y-1">
                <InputComponent
                  isRequired
                  classNames={{
                    [InputClassNameKeys.BASE]: "pt-6",
                  }}
                  endContent={
                    <PasswordToggleIcon
                      isVisible={isPasswordVisible}
                      toggleVisibility={togglePasswordVisibility}
                    />
                  }
                  label="Contraseña nueva"
                  labelPlacement={LabelPlacementProps.OUTSIDE}
                  minLength={6}
                  placeholder="********"
                  radius={RadiusProps.SM}
                  type={isPasswordVisible ? TypeProps.TEXT : TypeProps.PASSWORD}
                  value={password}
                  variant={VariantProps.BORDERED}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                />

                <InputComponent
                  isRequired
                  classNames={{
                    [InputClassNameKeys.BASE]: "pt-6",
                  }}
                  endContent={
                    <PasswordToggleIcon
                      isVisible={isConfirmPasswordVisible}
                      toggleVisibility={toggleConfirmPasswordVisibility}
                    />
                  }
                  label="Confirmar contraseña nueva"
                  labelPlacement={LabelPlacementProps.OUTSIDE}
                  minLength={6}
                  placeholder="********"
                  radius={RadiusProps.SM}
                  type={
                    isConfirmPasswordVisible
                      ? TypeProps.TEXT
                      : TypeProps.PASSWORD
                  }
                  value={confirmPassword}
                  variant={VariantProps.BORDERED}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(event.target.value)
                  }
                />
              </Form>
            </div>
          </ModalBody>

          <ModalFooter>
            {showCancelButton && (
              <ButtonComponent color={ColorButton.DANGER} onPress={onClose}>
                Cancelar
              </ButtonComponent>
            )}

            <ButtonComponent
              isDisabled={!password || !confirmPassword}
              color={ColorButton.PRIMARY}
              isLoading={isLoading}
              onPress={handleSubmit}
            >
              {titleButton}
            </ButtonComponent>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertModal {...AlertModalProps} placement={PositionModal.CENTER} />
      <ConfirmModal {...ConfirmModalProps} titleButton="Cerrar" />
    </>
  );
};
