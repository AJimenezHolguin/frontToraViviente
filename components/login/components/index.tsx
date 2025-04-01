"use client";
import Image from "next/image";
import { useState } from "react";
import { Form } from "@heroui/form";
import { useRouter } from "next/navigation";

import { ClassNameKeys } from "../../../types/classNamesKeys";
import { InputComponent } from "../../../shared/components/input/input";
import { ButtonComponent } from "../../../shared/components/button/button";
import { handleLogin } from "../domain/actions/authActions";

import {
  LabelPlacementProps,
  TypeProps,
  VariantProps,
} from "@/shared/components/input/types";
import { Colors } from "@/types/color.enum";
import { Text } from "@/shared/components/Text";
import { RadiusProps } from "@/types/radius.enum";
import { CheckboxComponent } from "@/shared/components/Checkbox";
import { COLORS } from "@/shared/styles/colors";

export const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("1");
    event.preventDefault();
    try {
      const response = await handleLogin(email, password);

      router.push("/");
      console.log("esta es la respuesta del login", response);
    } catch (error) {
      console.log("Error al iniciar sesion", error);
    }
  };

  return (
    <div className="lg:flex">
      <section className="m-[25px] h-full md:flex items-start justify-center lg:w-[1100]">
        <Image
          alt="Tora-Viviente"
          height={60}
          src={"/logo-tora-viviente-sin-fondo.png"}
          width={60}
        />
        <div className="sm:mt-3 md:mt-20  md:w-3/4 flex flex-col gap-3 lg:gap-0">
          <Text $v="h1" className={"mt-6"}>
            Sign In
          </Text>
          <Form onSubmit={handleSubmit}>
            <InputComponent
              classNames={{
                [ClassNameKeys.BASE]: "pt-6",
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
                [ClassNameKeys.BASE]: "pt-6",
              }}
              color={Colors.PRIMARY}
              label="Password"
              labelPlacement={LabelPlacementProps.OUTSIDE}
              placeholder={"***"}
              radius={RadiusProps.SM}
              type={TypeProps.PASSWORD}
              value={password}
              variant={VariantProps.BORDERED}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
            <div className="flex justify-between pt-6">
              <CheckboxComponent
                classNames={{
                  [ClassNameKeys.BASE]: "pt-8",
                }}
                color={Colors.PRIMARY}
              >
                Remember me
              </CheckboxComponent>
              <Text
                $color={COLORS.primary}
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
              type="submit"
            >
              Sign In
            </ButtonComponent>
          </Form>
          <div className="mt-6 flex justify-center gap-1">
            <Text $color={COLORS.black} $v="sm" className={"font-bold"}>
              Don&#8217;t have an account?
            </Text>
            <Text
              $color={COLORS.primary}
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
            libero iusto repudiandae alias mollitia, eligendi similique ab harum
            asperiores assumenda.@
          </p>
        </div>
      </section>
    </div>
  );
};
