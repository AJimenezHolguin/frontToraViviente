"use client";
import { Checkbox } from "@heroui/checkbox";

import { CheckboxProps } from "./types";

import { UseResponsiveSize } from "@/shared/utils/useResponsiveSize";

export const CheckboxComponent: React.FC<CheckboxProps> = ({
  isSelected,
  onChange,
  defaultSelected = false,
  color,
  classNames,
  children,
  size: propSize,
}) => {
  const size = UseResponsiveSize(propSize);

  return (
    <Checkbox
      onChange={(event) => onChange?.(event.target.checked)}
      isSelected={isSelected}
      classNames={classNames}
      color={color}
      defaultSelected={defaultSelected}
      size={size}
    >
      {children}
    </Checkbox>
  );
};
