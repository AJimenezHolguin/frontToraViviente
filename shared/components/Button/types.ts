import { ReactNode } from "react";
import { PressEvent } from "@heroui/button";

import { Sizes } from "@/types/sizes.enum";
import { ColorButton } from "@/styles/colorButton.enum";
import { RadiusProps } from "@/types/radius.enum";

export enum VariantButtonProps {
  SOLID = "solid",
  BORDERED = "bordered",
  LIGHT = "light",
  FLAT = "flat",
  FADED = "faded",
  SHADOW = "shadow",
  GHOST = "ghost",
}

export enum SpinnerProps {
  START = "start",
  END = "end",
}

export interface ButtonProps {
  color?: ColorButton;
  className?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  spinner?: ReactNode;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: Sizes;
  variant?: VariantButtonProps;
  spinnerPlacement?: SpinnerProps;
  onPress?: (e: PressEvent) => void;
  children: ReactNode;
  radius?: RadiusProps;
  type?: "submit";
 
}
