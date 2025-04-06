// shared/components/Alert/index.tsx
"use client";

import React from "react";
import { Alert } from "@heroui/alert";
import { Colors } from "@/types/color.enum";

type AlertComponentProps = {
  title: string;
  description: string;
  color?: Colors
  isVisible: boolean;
  variant : "solid" | "bordered" | "flat" | "faded"; 
  onClose: () => void;
};

export const AlertComponent: React.FC<AlertComponentProps> = ({
  title,
  description,
  color,
  isVisible,
  onClose,
  variant
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
      <Alert
        color={color}
        description={description}
        isVisible={isVisible}
        title={title}
        variant={variant}
        onClose={onClose}
      />
    </div>
  );
};
