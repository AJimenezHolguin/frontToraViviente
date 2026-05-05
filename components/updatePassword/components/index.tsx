"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COLORS } from "@/styles/colors";
import { Text } from "@/shared/components/Text";
import { InputComponent, PasswordToggleIcon } from "@/shared/components/Input";
import { InputClassNameKeys } from "@/types/classNamesKeys";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LabelPlacementProps,
  TypeProps,
  VariantProps,
} from "@/shared/components/Input/types";
import { RadiusProps } from "@/types/radius.enum";
import { Form } from "@heroui/form";
import { ButtonComponent } from "@/shared/components/Button";
import { ColorButton } from "@/styles/colorButton.enum";
import CustomAlert from "@/shared/components/CustomAlert";
import { Sizes } from "@/types/sizes.enum";
import { VariantButtonProps } from "@/shared/components/Button/types";
import { AlertType, AlertVariant } from "@/types/alert.interface";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { changePassword } from "@/services/users/changePassword.service";

export const UpdatePassword = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showConfirm, ConfirmModalProps } = useModalAlert();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [alert, setAlert] = useState<{
    title: string;
    description: string;
    visible: boolean;
  }>({ title: "", description: "", visible: false });

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prev) => !prev);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        title: "Error",
        description: "Las contraseñas no coinciden",
        visible: true,
      });

      return;
    }

    setIsLoading(true);

    try {
      const session = await getSession();

      const token = session?.user?.token;

      if (!token) {
        throw new Error("No hay sesión activa");
      }

      await changePassword({ newPassword: password });

      await signOut({ redirect: false });

      showConfirm(
        "Contraseña actualizada exitosamente. Por favor, inicia sesión con tu nueva contraseña.",
        () => {
          router.push("/login");
        },
        {
          showCancelButton: false,
          titleHeader: "¡Éxito!",
        }
      );
    } catch (error) {
      console.error(error);

      setAlert({
        title: "Error",
        description: "No se pudo actualizar la contraseña",
        visible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-4 w-full bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center font-[Plus_Jakarta_Sans]">
        <div className=" flex flex-col justify-center h-[500px] w-full max-w-md z-10">
          <div className="  text-center mb-8">
            <div className=" flex flex-col items-center gap-2">
              <div className=" w-15 h-15 p-1 rounded-full border-2 border-primary-container/20 overflow-hidden">
                <Image
                  alt="Tora-Viviente"
                  height={40}
                  src={"/logo-torah-viviente-2.png"}
                  width={50}
                />
              </div>

              <Text $color={COLORS.lila} $v="h1">
                Actualizar Contraseña
              </Text>

              <p className="text-secondary font-medium px-4">
                Asegura tu cuenta con una nueva clave de acceso.
              </p>
            </div>
          </div>

          <div className="h-full bg-surface-container-lowest rounded-xl shadow p-1 md:p-4 border ">
            <Form onSubmit={handleSubmit} className="space-y-1">
              <InputComponent
                isRequired={true}
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
                placeholder={"********"}
                radius={RadiusProps.SM}
                type={isPasswordVisible ? TypeProps.TEXT : TypeProps.PASSWORD}
                value={password}
                variant={VariantProps.BORDERED}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
              />

              <InputComponent
                isRequired={true}
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
                placeholder={"********"}
                radius={RadiusProps.SM}
                type={
                  isConfirmPasswordVisible ? TypeProps.TEXT : TypeProps.PASSWORD
                }
                value={confirmPassword}
                variant={VariantProps.BORDERED}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(event.target.value)
                }
              />

              <ButtonComponent
                className="mt-[45px] text-white font-bold"
                color={ColorButton.PRIMARY}
                fullWidth={true}
                isDisabled={!password || !confirmPassword}
                isLoading={isLoading}
                type="submit"
              >
                Actualizar →
              </ButtonComponent>

              <div className="w-full text-center">
                <Link
                  className="text-secondary text-sm hover:text-primary "
                  href="/login"
                >
                  Cancelar y volver al inicio
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {alert.visible && (
        <CustomAlert
          color={ColorButton.DANGER}
          description={alert.description}
          endContent={
            <ButtonComponent
              color={ColorButton.PRIMARY}
              size={Sizes.SM}
              variant={VariantButtonProps.SOLID}
              onPress={() => setAlert((prev) => ({ ...prev, visible: false }))}
            >
              Cerrar
            </ButtonComponent>
          }
          isVisible={true}
          title={alert.title}
          type={AlertType.ERROR}
          variant={AlertVariant.SOLID}
          onClose={() => setAlert((prev) => ({ ...prev, visible: false }))}
        />
      )}
      <ConfirmModal {...ConfirmModalProps} titleButton="Volver al login" />
    </>
  );
};
