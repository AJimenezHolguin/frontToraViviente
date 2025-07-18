"use client";
import { Input } from "@heroui/input";
import { InputProps, PasswordToggleIconProps } from "./types";
import { UseResponsiveSize } from "@/shared/utils/useResponsiveSize";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";

export const PasswordToggleIcon: React.FC<PasswordToggleIconProps> = ({
  isVisible,
  toggleVisibility,
}) => (
  <button
    aria-label="toggle password visibility"
    className="focus:outline-none"
    type="button"
    onClick={toggleVisibility}
  >
    {isVisible ? (
      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
    ) : (
      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
    )}
  </button>
);

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
  endContent = undefined,
  onChange,
  isClearable = false,
  onValueChange,
  startContent,
}) => {
  const size = UseResponsiveSize(propSize);

  return (
    <Input
      classNames={classNames}
      color={
        color as
          | "default"
          | "primary"
          | "secondary"
          | "success"
          | "warning"
          | "danger"
          | undefined
      }
      defaultValue={defaultValue}
      endContent={endContent}
      errorMessage={errorMessage}
      fullWidth={fullWidth}
      isClearable={isClearable}
      isRequired={isRequired}
      label={label}
      labelPlacement={labelPlacement}
      maxLength={maxLength}
      minLength={minLength}
      placeholder={placeholder}
      radius={radius}
      size={size}
      startContent={startContent}
      type={type}
      value={value}
      variant={variant}
      onChange={onChange}
      onValueChange={onValueChange}
    />
  );
};
