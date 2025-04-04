"use client";
import { Input } from "@heroui/input";

import { InputProps } from "./types";

import { UseResponsiveSize } from "@/shared/utils/useResponsiveSize";

export const InputComponent: React.FC<InputProps> = ({
  classNames = {},
  color,
  label,
  labelPlacement,
  placeholder,
  type,
  variant,
  radius,
  size: propSize,
  value,
  defaultValue,
  errorMessage,
  fullWidth,
  isRequired,
  maxLength,
  minLength,
  endContent,
  onChange,
}) => {
  const size = UseResponsiveSize(propSize);

  return (
    <Input
      classNames={classNames}
      color={color}
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      fullWidth={fullWidth}
      isRequired={isRequired}
      label={label}
      labelPlacement={labelPlacement}
      maxLength={maxLength}
      minLength={minLength}
      placeholder={placeholder}
      radius={radius}
      size={size}
      type={type}
      value={value}
      variant={variant}
      onChange={onChange}
      endContent={endContent}
    />
  );
};
