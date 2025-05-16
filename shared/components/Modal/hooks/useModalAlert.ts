
import { useState } from "react";
import { AlertType } from "../types";

export const useModalAlert = () => {
  const [alertType, setAlertType] = useState<AlertType>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState("");

  const showAlert = (type: AlertType, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
  };

  const showConfirm = (message: string, onConfirm: () => void) => {
    setConfirmMessage(message);
    setOnConfirmAction(() => onConfirm);
    setIsConfirmOpen(true);
  };

  const AlertModalProps = {
    isOpen: !!alertType,
    type: alertType!,
    message: alertMessage,
    onClose: () => setAlertType(null),
  };

  const ConfirmModalProps = {
    isOpen: isConfirmOpen,
    message: confirmMessage,
    onClose: () => setIsConfirmOpen(false),
    onConfirm: () => {
      onConfirmAction();
      setIsConfirmOpen(false);
    },
  };

  return {
    showAlert,
    showConfirm,
    AlertModalProps,
    ConfirmModalProps,
  };
};
