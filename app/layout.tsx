
import "@/styles/globals.css";
import { Metadata } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Tora Viviente",
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
