"use client";

import { Form } from "@heroui/form";
import { useState } from "react";

import { TypeProps, VariantProps } from "@/shared/components/input/types";
import { InputComponent } from "@/shared/components/input/input";
import { Sizes } from "@/types/sizes.enum";
import { ButtonComponent } from "@/shared/components/button/button";
import {
  SpinnerProps,
  VariantButtonProps,
} from "@/shared/components/button/types";
import { Colors } from "@/types/color.enum";

export default function Home() {
  const [inputValue, setInpuValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInpuValue(event.target.value);
  };

  return (
    <Form>
      <ButtonComponent
        color={Colors.PRIMARY}
        isLoading={false}
        size={Sizes.MD}
        spinnerPlacement={SpinnerProps.END}
        variant={VariantButtonProps.SHADOW}
      >
        Enviar datos
      </ButtonComponent>

      <InputComponent
        fullWidth={false}
        isRequired={true}
        label="Correo Electrónico"
        minLength={5}
        placeholder="Ingresa tu correo"
        size={Sizes.SM}
        type={TypeProps.EMAIL}
        value={inputValue}
        variant={VariantProps.UNDERLINED}
        onChange={handleInputChange}
      />
    </Form>
  );
}
