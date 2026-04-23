"use client";

import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export const Unauthorized = () => {
  const router = useRouter();

  const { showConfirm, ConfirmModalProps } = useModalAlert();

  useEffect(() => {
    showConfirm(
      "¡No tienes permisos para acceder a esta página!",
      () => {
        router.push("/dashboard/all-playlists");
      },
      {
        showCancelButton: false,
        titleHeader: "Acceso denegado",
      }
    );
  }, []);

  return (
    <>
      <ConfirmModal {...ConfirmModalProps} titleButton="Volver a playlists" />
    </>
  );
};
