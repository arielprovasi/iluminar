import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getRootMetadata } from "@/config/site";

export const metadata: Metadata = getRootMetadata();

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
