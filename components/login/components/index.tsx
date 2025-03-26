import Image from "next/image";

import { ClassNameKeys } from "../../../types/classNamesKeys";
import { InputComponent } from "../../../shared/components/input/input";
import { ButtonComponent } from "../../../shared/components/button/button";

import {
  LabelPlacementProps,
  TypeProps,
  VariantProps,
} from "@/shared/components/input/types";
import { Sizes } from "@/types/sizes.enum";
import { Colors } from "@/types/color.enum";
import { Text } from "@/shared/components/Text";
import { RadiusProps } from "@/types/radius.enum";
import { CheckboxComponent } from "@/shared/components/Checkbox";
import { COLORS } from "@/shared/styles/colors";

export const Login = () => {
  return (
    <section className="m-[25px] h-full">
      <Image
        alt="Tora-Viviente"
        height={60}
        src={"/logo-tora-viviente-sin-fondo.png"}
        width={60}
      />
      <Text $v="h1" className={"mt-6"}>
        Sign In
      </Text>
      <InputComponent
        classNames={{
          [ClassNameKeys.BASE]: "pt-6",
        }}
        color={Colors.PRIMARY}
        label="E-mail"
        labelPlacement={LabelPlacementProps.OUTSIDE}
        placeholder={"example@gmail.com"}
        size={Sizes.SM}
        type={TypeProps.EMAIL}
        variant={VariantProps.BORDERED}
      />
      <InputComponent
        classNames={{
          [ClassNameKeys.BASE]: "pt-6",
        }}
        color={Colors.PRIMARY}
        label="Password"
        labelPlacement={LabelPlacementProps.OUTSIDE}
        placeholder={"@#*%"}
        radius={RadiusProps.SM}
        size={Sizes.SM}
        type={TypeProps.PASSWORD}
        variant={VariantProps.BORDERED}
      />
      <div className="flex justify-between pt-6">
        <CheckboxComponent
          classNames={{
            [ClassNameKeys.BASE]: "pt-8",
          }}
          color={Colors.PRIMARY}
          size={Sizes.SM}
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
        className="mt-[45px] "
        fullWidth={true}
        radius={RadiusProps.FULL}
      >
        Sign In
      </ButtonComponent>
    </section>
  );
};
