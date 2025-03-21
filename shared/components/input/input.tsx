import { Input } from "@heroui/input";

import { InputProps } from "./types";

export const InputComponent: React.FC<InputProps> = (props) => {
  const {
    label,
    placeholder,
    type,
    variant,
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
    <>
      <Input
        defaultValue={defaultValue}
        errorMessage={errorMessage}
        fullWidth={fullWidth}
        isRequired={isRequired}
        label={label}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        size={size}
        type={type}
        value={value}
        variant={variant}
        onChange={onChange}
        // validate={handleValidation}
      />
    </>
  );
};
