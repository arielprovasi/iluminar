import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteConfig } from "@/config/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://iluminar-one.vercel.app");

const metadataBase = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);

/** Static asset in /public — absolute URL helps crawlers and sharing debuggers */
const ogImage = {
  url: new URL("/og-image.png", metadataBase).href,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${siteConfig.businessName} — ${siteConfig.tagline} em Sorocaba`,
} as const;

export const metadata: Metadata = {
  metadataBase,
  manifest: "/site.webmanifest",
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  keywords: [
    "materiais eletricos",
    "iluminacao led",
    "hidraulica",
    "construcao",
    "sorocaba",
  ],
  openGraph: {
    type: "website",
    url: new URL("/", metadataBase),
    locale: "pt_BR",
    siteName: siteConfig.businessName,
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    images: [ogImage.url],
  },
};

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
