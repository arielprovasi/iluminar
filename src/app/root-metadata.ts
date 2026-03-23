import type { Metadata } from "next";

import { siteConfig } from "@/config/site-config";

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  }
  return "https://iluminar-one.vercel.app";
}

const siteUrl = resolveSiteUrl();
const metadataBase = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);

/** Root `metadata` export; co-located with `app/layout.tsx` (Next.js convention). */
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Iluminar — Materiais elétricos e construção em Sorocaba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
};
