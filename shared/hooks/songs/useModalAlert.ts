import { useState } from "react";
import { AlertType } from "../../components/Modal/types";

export const useModalAlert = () => {
  const [alertType, setAlertType] = useState<AlertType>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState<
    (inputValue?: string) => void
  >(() => {});
  const [confirmMessage, setConfirmMessage] = useState("");

  const [confirmConfig, setConfirmConfig] = useState<{
    withInput?: boolean;
    inputLabel?: string;
  }>({});

  const showAlert = (type: AlertType, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
  };

  const showConfirm = (
    message: string,
    onConfirm: (inputValue?: string) => void,
    config?: {
      withInput?: boolean;
      inputLabel?: string;
    }
  ) => {
    setConfirmMessage(message);
    setOnConfirmAction(() => onConfirm);
    setConfirmConfig(config || {});
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
    onConfirm: async (inputValue?: string) => {
      await onConfirmAction(inputValue);
      setIsConfirmOpen(false);
    },
    withInput: confirmConfig.withInput,
    inputLabel: confirmConfig.inputLabel,
  };

  return {
    showAlert,
    showConfirm,
    AlertModalProps,
    ConfirmModalProps,
  };
};
