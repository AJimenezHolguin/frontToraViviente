"use client";

import { Button } from "@heroui/button";
import React from "react";
import { Alert } from "@heroui/alert";
import { Colors } from "@/types/color.enum";

type AlertType = "info" | "action";

interface CustomAlertProps {
  color: Colors;
  type: AlertType;
  title: string;
  isVisible: boolean;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
  onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  color,
  type,
  title,
  description,
  actionText = "Confirm",
  onActionClick,
  onClose,
  isVisible,
}) => {
  switch (type) {
    case "info":
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
                  variant="solid"
                  onClose={onClose}
                />
              </div>
            </div>
          )}
        </>
      );
    case "action":
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm pointer-events-auto">
          <div className="w-full max-w-4xl px-6">
            <Alert
              color={color}
              description={description}
              endContent={
                <>
                  <Button
                    color={Colors.PRIMARY}
                    size="sm"
                    variant="solid"
                    onPress={onActionClick}
                  >
                    {actionText}
                  </Button>
                  <Button
                    color={Colors.SECONDARY}
                    size="sm"
                    variant="solid"
                    onPress={onActionClick}
                  >
                    {actionText}
                  </Button>
                </>
              }
              title={title}
              variant="solid"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default CustomAlert;
