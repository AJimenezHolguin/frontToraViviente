import { Button } from "@heroui/button";

import { ButtonProps } from "./types";

export const ButtonComponent: React.FC<ButtonProps> = (props) => {
  const {
    spinnerPlacement,
    isLoading,
    size,
    variant,

    color,
    children,
    fullWidth = false,
  } = props;

  return (
    <Button
      color={color}
      isLoading={isLoading}
      size={size}
      fullWidth={fullWidth}
      spinner={
        <svg
          className="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      }
      spinnerPlacement={spinnerPlacement}
      variant={variant}
    >
      {isLoading ? "Guardando..." : children}
    </Button>
  );
};
