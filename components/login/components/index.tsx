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
import { Colors } from "@/types/color.enum";
import { Text } from "@/shared/components/Text";
import { RadiusProps } from "@/types/radius.enum";
import { CheckboxComponent } from "@/shared/components/Checkbox";
import { COLORSTEXT } from "@/shared/styles/colors";
import { signIn } from "next-auth/react";
import CustomAlert from "@/shared/components/CustomAlert";
import { AlertType, AlertVariant } from "@/types/alert.interface";
import { VariantButtonProps } from "@/shared/components/Button/types";
import { Button } from "@heroui/button";
import { Sizes } from "@/types/sizes.enum";

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
      error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative lg:flex">
        <section className="m-[25px] h-full md:flex items-start justify-center lg:w-[1100]">
          <Image
            alt="Tora-Viviente"
            height={70}
            src={"/logo-torah-viviente-2.png"}
            width={70}
          />
          <div className="sm:mt-3 md:mt-20  md:w-3/4 flex flex-col gap-3 lg:gap-0">
            <Text $v="h1" className={"mt-6"}>
              Sign In
            </Text>
            <Form onSubmit={handleSubmit}>
              <InputComponent
                classNames={{
                  [InputClassNameKeys.BASE]: "pt-6",
                }}
                color={Colors.PRIMARY}
                label="E-mail"
                labelPlacement={LabelPlacementProps.OUTSIDE}
                placeholder={"example@gmail.com"}
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
                color={Colors.PRIMARY}
                endContent={
                  <PasswordToggleIcon
                    isVisible={isVisible}
                    toggleVisibility={toggleVisibility}
                  />
                }
                label="Password"
                labelPlacement={LabelPlacementProps.OUTSIDE}
                minLength={6}
                placeholder={"***"}
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
                  color={Colors.PRIMARY}
                >
                  Remember me
                </CheckboxComponent>
                <Text
                  $color={COLORSTEXT.primary}
                  $v="sm"
                  className={
                    "mt-6 font-bold underline decoration-black-500 underline-offset-4"
                  }
                >
                  Forgot Password?
                </Text>
              </div>

              <ButtonComponent
                className="mt-[45px]"
                fullWidth={true}
                isDisabled={!email || !password}
                isLoading={isLoading}
                type="submit"
              >
                Sign In
              </ButtonComponent>
            </Form>

            <div className="mt-6 flex justify-center gap-1">
              <Text $color={COLORSTEXT.black} $v="sm" className={"font-bold"}>
                Don&#8217;t have an account?
              </Text>
              <Text
                $color={COLORSTEXT.primary}
                $v="sm"
                className={
                  "font-bold underline decoration-black-500 underline-offset-4"
                }
              >
                Create now
              </Text>
            </div>
          </div>
        </section>
        <section className="hidden lg:flex items-center justify-center w-full p-[40px]">
          <div className="lg flex flex-col items-center justify-center">
            <Image
              alt={"login"}
              height={300}
              src={"/login/login.svg"}
              width={400}
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              libero iusto repudiandae alias mollitia, eligendi similique ab
              harum asperiores assumenda.@
            </p>
          </div>
        </section>
      </div>
      {alert.visible && (
        <CustomAlert
          color={Colors.DANGER}
          description={alert.description}
          endContent={
            <Button
            color={Colors.PRIMARY}
            size={Sizes.SM}
            variant={VariantButtonProps.SOLID}
            onPress={() => setAlert((prev) => ({ ...prev, visible: false }))}
            >
              Cerrar
            </Button>
          }
          isVisible={true}
          title={alert.title}
          type= {AlertType.ERROR}
          variant={AlertVariant.SOLID}
          onClose={() => setAlert((prev) => ({ ...prev, visible: false }))}
        />
      )}
    </>
  );
};
