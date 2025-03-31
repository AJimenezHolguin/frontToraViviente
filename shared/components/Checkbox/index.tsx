"use client";
import { Checkbox } from "@heroui/checkbox";

import { CheckboxProps } from "./types";

import { UseResponsiveSize } from "@/shared/utils/useResponsiveSize";

export const CheckboxComponent: React.FC<CheckboxProps> = ({
  defaultSelected = false,
  color,
  classNames,
  children,
  size: propSize,
}) => {
  const size = UseResponsiveSize(propSize);

  return (
    <Checkbox
      classNames={classNames}
      color={color}
      defaultSelected={defaultSelected}
      size={size}
    >
      {children}
    </Checkbox>
  );
};
