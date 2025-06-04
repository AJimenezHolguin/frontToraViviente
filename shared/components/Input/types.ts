import { ReactNode } from "react";

import { Sizes } from "@/types/sizes.enum";
import { ColorButton } from "@/styles/colorButton.enum";
import { RadiusProps } from "@/types/radius.enum";
import { InputClassNameKeys } from "@/types/classNamesKeys";

export enum LabelPlacementProps {
  INSIDE = "inside",
  OUTSIDE = "outside",
  OUTSIDE_LEFT = "outside-left",
}

export enum VariantProps {
  FLAT = "flat",
  BORDERED = "bordered",
  FADED = "faded",
  UNDERLINED = "underlined",
}

export enum TypeProps {
  TEXT = "text",
  EMAIL = "email",
  URL = "url",
  PASSWORD = "password",
  TEL = "tel",
  SEARCH = "search",
  FILE = "file",
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ValidationError {
  isValid: boolean;
  message?: string;
}

export interface InputProps {
  classNames?: Partial<Record<InputClassNameKeys, string>>;
  color?: ColorButton;
  label?: string;
  labelPlacement?: LabelPlacementProps;
  placeholder?: string;
  variant?: VariantProps;
  size?: Sizes;
  value?: string;
  defaultValue?: string;
  type?: TypeProps;
  errorMessage?: string;
  validate?: (value: string) => true | ValidationError | null | undefined;
  radius?: RadiusProps;
  startContent?: ReactNode;
  endContent?: ReactNode;
  fullWidth?: boolean;
  isClearable?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onValueChange?: (value: string) => void;
}

export interface PasswordToggleIconProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

export interface EyeSlashFilledIconProps
  extends React.SVGProps<SVGSVGElement> {}
