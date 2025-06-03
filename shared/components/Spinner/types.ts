import { Colors } from "@/styles/colorButton.enum";
import { Sizes } from "@/types/sizes.enum";

export interface SpinnerProps {
  size: Sizes;
  color: Colors;
  variant: SpinnerVariant;
}

export enum SpinnerVariant {
  DEFAULT = "default",
  SIMPLE = "simple",
  GRADIENT = "gradient",
  WAVE = "wave",
  DOTS = "dots",
  SPINNER = "spinner",
}
