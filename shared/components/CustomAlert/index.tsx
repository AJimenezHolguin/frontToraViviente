"use client";

import React from "react";
import { Alert } from "@heroui/alert";
import { CustomAlertProps } from "@/types/alert.interface";
import { AlertType } from "../../../types/alert.interface";

const CustomAlert: React.FC<CustomAlertProps> = ({
  color,
  endContent,
  type,
  title,
  description,
  onClose,
  isVisible,
  variant,
}) => {
  switch (type) {
    case AlertType.ERROR:
      return (
        <>
          {isVisible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm pointer-events-auto">
              <div className="w-full max-w-4xl px-6">
                <Alert
                  color={color}
                  description={description}
                  isVisible={isVisible}
                  title={title}
                  variant={variant}
                  onClose={onClose}
                />
              </div>
            </div>
          )}
        </>
      );
    case AlertType.ACTION:
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm pointer-events-auto">
          <div className="w-full max-w-4xl px-6">
            <Alert
              color={color}
              description={description}
              endContent={endContent}
              title={title}
              variant={variant}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default CustomAlert;
