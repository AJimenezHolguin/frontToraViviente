import { Input } from "@heroui/input";

import { InputProps } from "./types";

export const InputComponent: React.FC<InputProps> = (props) => {
  const {
    classNames = {},
    color,
    label,
    labelPlacement,
    placeholder,
    type,
    variant,
    radius,
    size,
    value,
    defaultValue,
    errorMessage,
    fullWidth,
    isRequired,
    maxLength,
    minLength,
    onChange,
    // validate,
  } = props;

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
      // validate={handleValidation}
    />
  );
};
