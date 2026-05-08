"use client";

import React, { useState } from "react";
import { Form } from "@heroui/form";
import { InputComponent, PasswordToggleIcon } from "../Input";
import { ButtonComponent } from "../Button";
import { SelectedInput } from "../SeletedInput";
import { UserFormProps } from "./types";
import { VariantProps, TypeProps } from "../Input/types";
import { ColorButton } from "@/styles/colorButton.enum";
import { RadiusProps } from "@/types/radius.enum";
import { roleOptions } from "@/shared/constants/roleOptions";
import { UserRole } from "@/services/users/types";

export const UserForm: React.FC<UserFormProps> = ({
  form,
  setForm,
  onSubmit,
  isLoading = false,
  showRoleField = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <InputComponent
        isRequired
        label="Nombre"
        placeholder="Ingresa tu nombre"
        value={form.name}
        variant={VariantProps.BORDERED}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <InputComponent
        isRequired
        label="Correo electrónico"
        placeholder="ejemplo@email.com"
        type={TypeProps.EMAIL}
        value={form.email}
        variant={VariantProps.BORDERED}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <InputComponent
        isRequired
        endContent={
          <PasswordToggleIcon
            isVisible={isPasswordVisible}
            toggleVisibility={togglePasswordVisibility}
          />
        }
        label="Contraseña"
        minLength={6}
        placeholder="********"
        radius={RadiusProps.SM}
        type={isPasswordVisible ? TypeProps.TEXT : TypeProps.PASSWORD}
        value={form.password}
        variant={VariantProps.BORDERED}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      {showRoleField && (
        <SelectedInput
          isRequired
          label="Rol"
          options={roleOptions}
          placeholder="Selecciona un rol"
          value={form.role || ""}
          onChange={(value) =>
            setForm({
              ...form,
              role: value as UserRole,
            })
          }
        />
      )}

      <ButtonComponent
        fullWidth
        className="mt-4 text-white font-bold"
        color={ColorButton.PRIMARY}
        isDisabled={
          !form.name ||
          !form.email ||
          !form.password ||
          (showRoleField && !form.role)
        }
        isLoading={isLoading}
        type="submit"
      >
        {showRoleField ? "Crear usuario" : "Crear cuenta"}
      </ButtonComponent>
    </Form>
  );
};
