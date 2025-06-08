import { ReactNode } from "react";

import { Sizes } from "../../../types/sizes.enum";

import { ColorButton } from "@/styles/colorButton.enum";
import { InputClassNameKeys } from "@/types/classNamesKeys";

export enum OrientacionCheckbox {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export interface CheckboxProps {
  children?: ReactNode;
  defaultSelected?: boolean;
  orientation?: OrientacionCheckbox;
  color?: ColorButton;
  size?: Sizes;
  name?: string;
  value?: string;
  isSelected?: boolean;
  onChange?: React.ChangeEvent<HTMLInputElement>;
  onValueChange?: (isSelected: boolean) => void;
  classNames?: Partial<Record<InputClassNameKeys, string>>;
}
