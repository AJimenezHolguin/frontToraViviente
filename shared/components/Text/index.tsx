import React from "react";
import clsx from "clsx";

import { VARIANT_STYLES, TextProps } from "@/shared/components/Text/types";

export const Text: React.FC<TextProps> = ({
  children,
  $v = "sm",
  $color,
  $fw,
  $ta,
  className,
  ...props
}) => {
  const variantStyles = VARIANT_STYLES[$v];

  return (
    <p
      className={clsx("m-0", className)}
      style={{
        fontSize: variantStyles?.fontSize,
        fontWeight: $fw ?? variantStyles?.fontWeight,
        color: $color,
        textAlign: $ta,
      }}
      {...props}
    >
      {children}
    </p>
  );
};
