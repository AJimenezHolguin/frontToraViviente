"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { SessionProvider, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { eventBus } from "@/shared/utils/eventBus";
import { AlertModal } from "@/shared/components/Modal/ModalAlert";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  const { showAlert, AlertModalProps } = useModalAlert();

  const handleCloseAndRedirect = async () => {
    AlertModalProps.onClose();
    await signOut({ redirect: false });
    router.push("/login");
  };

  useEffect(() => {
    const handleTokenExpired = () => {
      showAlert(
        "error",
        "Su sesión ha expirado. Por favor, inicie sesión nuevamente."
      );
    };

    eventBus.on("tokenExpired", handleTokenExpired);

    return () => {
      eventBus.off("tokenExpired", handleTokenExpired);
    };
  }, [showAlert]);

  return (
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <AlertModal {...AlertModalProps} onClose={handleCloseAndRedirect} />
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
