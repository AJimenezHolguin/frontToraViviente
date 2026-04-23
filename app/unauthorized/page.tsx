"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal";

export default function UnauthorizedPage() {
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
      <ConfirmModal
        {...ConfirmModalProps}
        titleButton="Volver a playlists"
      />
    </>
  );
}