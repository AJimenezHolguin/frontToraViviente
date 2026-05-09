"use client";

import { useEffect, useState } from "react";
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
import { SpinnerComponent } from "@/shared/components/Spinner";

export const RegisterPublic = () => {
  const router = useRouter();


  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showConfirm, ConfirmModalProps } = useModalAlert();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useState(false);
  const [alert, setAlert] = useState<{
    title: string;
    description: string;
    visible: boolean;
  }>({ title: "", description: "", visible: false });
  
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  

  
  useEffect(() => {
    const initialize = async () => {
      try {
        const session = await getSession();

        if (session) {
          router.push("/login");
          
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsPageLoading(false);
      }
    };

    initialize();
  }, [router]);
  
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
    try {
      setIsSubmitting(true);
      const session = await getSession();
      
      const token = session?.user?.token;
      
      if (!token) {
        throw new Error("No hay sesión activa");
      }
      
      await changePassword({ newPassword: password });
      
      await signOut({ redirect: false });
      
      showConfirm(
        "Usuario registrado exitosamente por favor inicia sesión con tu nueva contraseña.",
        () => {
          router.push("/dashboard/all-playlists");
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
      setIsSubmitting(false);
    }
  };
  
  if (isPageLoading) return <SpinnerComponent />;

  return (
    <>
      <div className="p-4 w-full h-full flex flex-col items-center justify-center bg-surface text-on-surface font-[Plus_Jakarta_Sans]">
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
                Registro de usuario
              </Text>

              <p className="text-secondary font-medium px-4">
              Completa tu registro y activa tu nueva cuenta de usuario.
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
             
                label="Nombre y apellidos"
                labelPlacement={LabelPlacementProps.OUTSIDE}
                minLength={6}
                placeholder={"Ejemplo: Juan Giraldo Cortes"}
                radius={RadiusProps.SM}
                type={TypeProps.TEXT }
                value={name}
                variant={VariantProps.BORDERED}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
              />
              <InputComponent
                isRequired={true}
                classNames={{
                  [InputClassNameKeys.BASE]: "pt-6",
                }}
           
                label="Email"
                labelPlacement={LabelPlacementProps.OUTSIDE}
                minLength={6}
                placeholder={"Ejemplo: usuario@toraviviente.com"}
                radius={RadiusProps.SM}
                type={TypeProps.TEXT }
                value={email}
                variant={VariantProps.BORDERED}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
              />

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
                label="contraseña"
                labelPlacement={LabelPlacementProps.OUTSIDE}
                minLength={6}
                placeholder={"********"}
                radius={RadiusProps.SM}
                type={
                    isPasswordVisible ? TypeProps.TEXT : TypeProps.PASSWORD
                }
                value={password}
                variant={VariantProps.BORDERED}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
              />

              <ButtonComponent
                className="mt-[45px] text-white font-bold"
                color={ColorButton.PRIMARY}
                fullWidth={true}
                isDisabled={!name || !email || !password }
                isLoading={isSubmitting}
                type="submit"
              >
                Registrarse →
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
      <ConfirmModal {...ConfirmModalProps} titleButton="Entrar" />
    </>
  );
};
