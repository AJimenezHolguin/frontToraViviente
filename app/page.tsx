"use client";

import { Form } from "@heroui/form";
import { useState } from "react";

import { TypeProps, VariantProps } from "@/shared/components/Input/types";
import { InputComponent } from "@/shared/components/Input";
import { Sizes } from "@/types/sizes.enum";
import { ButtonComponent } from "@/shared/components/Button";
import { Colors } from "@/types/color.enum";

export default function Home() {
  const [inputValue, setInpuValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInpuValue(event.target.value);
  };

  return (
    <Form>
      <ButtonComponent>Enviar datos</ButtonComponent>

      <InputComponent
        color={Colors.PRIMARY}
        fullWidth={false}
        isRequired={true}
        label="Correo Electrónico"
        minLength={5}
        placeholder="Ingresa tu correo"
        size={Sizes.LG}
        type={TypeProps.EMAIL}
        value={inputValue}
        variant={VariantProps.FADED}
        onChange={handleInputChange}
      />
    </Form>
  );
}
