"use client";
import Image from "next/image";
import { useState } from "react";
import { Form } from "@heroui/form";
import { useRouter } from "next/navigation";

import { InputClassNameKeys } from "../../../types/classNamesKeys";
import {
  InputComponent,
  PasswordToggleIcon,
} from "../../../shared/components/Input";
import { ButtonComponent } from "../../../shared/components/Button";

import {
  LabelPlacementProps,
  TypeProps,
  VariantProps,
} from "@/shared/components/Input/types";
import { ColorButton } from "@/styles/colorButton.enum";
import { Text } from "@/shared/components/Text";
import { RadiusProps } from "@/types/radius.enum";
import { CheckboxComponent } from "@/shared/components/Checkbox";

import { signIn } from "next-auth/react";
import CustomAlert from "@/shared/components/CustomAlert";
import { AlertType, AlertVariant } from "@/types/alert.interface";
import { VariantButtonProps } from "@/shared/components/Button/types";
import { Button } from "@heroui/button";
import { Sizes } from "@/types/sizes.enum";
import { COLORS } from "@/styles/colors";

export const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    title: string;
    description: string;
    visible: boolean;
  }>({ title: "", description: "", visible: false });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (response?.ok) {
        router.push("/");
      } else {
        setAlert({
          title: "Credenciales incorrectas",
          description: "El email o la contraseña no son correctos.",
          visible: true,
        });
      }
    } catch (error) {
      throw new Error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="lg:flex">
        <section className="w-full h-screen md:flex flex-col gap-1 items-center justify-center md:w-[900px] lg:w-[1100px] lg:h-[100vh] lg:p-[50px]">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-3/4 md:w-dvw lg:w-[90%]">
              <Image
                alt="Tora-Viviente"
                height={40}
                src={"/logo-torah-viviente-2.png"}
                width={50}
              />
            </div>

            <div className="w-3/4 lg:w-4/5 flex flex-col justify-center gap-3 lg:gap-0">
              <Text 
              $v="h1"
              $color={COLORS.lila}
              >
                Iniciar sesión
              </Text>
              <Form onSubmit={handleSubmit}>
                <InputComponent
                  classNames={{
                    [InputClassNameKeys.BASE]: "pt-6 w-[100%]",
                  }}
                 
                  label="Correo electrónico"
                  labelPlacement={LabelPlacementProps.OUTSIDE}
                  placeholder={"ejemplo@gmail.com"}
                  type={TypeProps.EMAIL}
                  value={email}
                  variant={VariantProps.BORDERED}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event?.target.value)
                  }
                />
                <InputComponent
                  classNames={{
                    [InputClassNameKeys.BASE]: "pt-6",
                  }}
                  
                  endContent={
                    <PasswordToggleIcon
                      isVisible={isVisible}
                      toggleVisibility={toggleVisibility}
                    />
                  }
                  
                  label="Contraseña"
                  labelPlacement={LabelPlacementProps.OUTSIDE}
                  minLength={6}
                  placeholder={"********"}
                  radius={RadiusProps.SM}
                  type={isVisible ? TypeProps.TEXT : TypeProps.PASSWORD}
                  value={password}
                  variant={VariantProps.BORDERED}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                />

                <div className="flex justify-between pt-6 w-full">
                  <CheckboxComponent
                    classNames={{
                      [InputClassNameKeys.BASE]: "pt-8",
                    }}
                    color={ColorButton.PRIMARY}
                  >
                    Recordarme
                  </CheckboxComponent>
                  <Text
                    $color={COLORS.lila}
                    $v="sm"
                    className={
                      "mt-6 font-bold underline decoration-black-500 underline-offset-4"
                    }
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>
                </div>

                <ButtonComponent
                  color={ColorButton.PRIMARY}
                  className="mt-[45px] text-white font-bold"
                  fullWidth={true}
                  isDisabled={!email || !password}
                  isLoading={isLoading}
                  type="submit"
                >
                  Iniciar sesión
                </ButtonComponent>
              </Form>

              <div className=" mt-6 flex justify-center gap-1">
                <Text $color={COLORS.black} $v="sm" className={"font-bold"}>
                  No tienes una cuenta?
                </Text>
                <Text
                  $color={COLORS.lila}
                  $v="sm"
                  className={
                    "font-bold underline decoration-black-500 underline-offset-4"
                  }
                >
                  Crear una cuenta
                </Text>
              </div>
            </div>
          </div>

        </section>
        <section className="h-screen bg-secondary hidden lg:flex items-center justify-center w-3/4 p-[40px]">
          <div className="lg flex flex-col items-center justify-center">
            <Image
              alt={"login"}
              height={300}
              src={"/login/login.svg"}
              width={400}
            />
            <Text $v="h5" className="w-[90%] text-white text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              libero iusto repudiandae alias mollitia, eligendi similique ab
              harum asperiores assumenda.@
            </Text>
          </div>
        </section>
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
    </>
  );
};
