import { Sizes } from "@/types/sizes.enum";

export interface SpinnerProps {
  size: Sizes;
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
