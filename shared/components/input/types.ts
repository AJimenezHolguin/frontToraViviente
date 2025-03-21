import { ReactNode } from "react";

import { Sizes } from "@/types/sizes.enum";

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
  label: string;
  placeholder?: string;
  variant: VariantProps;
  size?: Sizes;
  value: string;
  defaultValue?: string;
  type: TypeProps;
  errorMessage?: string;
  validate?: (value: string) => true | ValidationError | null | undefined;
  startContent?: ReactNode;
  endContent?: ReactNode;
  fullWidth?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
