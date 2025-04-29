import { Spinner } from "@heroui/react";
import { SpinnerProps } from "./types";

export const SpinnerComponent = ({
  size,
  color,
  variant,
}: SpinnerProps) => {
  return <Spinner color={color} size={size} variant={variant} />;
};
