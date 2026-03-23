import type { Metadata } from "next";

import { siteConfig } from "@/config/site-config";

/**
 * Canonical site origin for metadata (og:url, og:image, Twitter cards).
 * Prefer explicit env, then Vercel's *production* hostname — not `VERCEL_URL`,
 * which is the per-deployment host (e.g. `project-abc123.vercel.app`). Crawlers
 * often fetch the shared link (e.g. `iluminar-one.vercel.app`) but read
 * `og:image` as absolute URL; a mismatched or ephemeral deploy host can cause
 * them to fall back to `apple-touch-icon` / `icon.png` (the lamp asset).
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) {
    const host = productionHost.replace(/^https?:\/\//, "").replace(/\/+$/, "");
    return `https://${host}`;
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
  alternates: {
    canonical: "/",
  },
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
