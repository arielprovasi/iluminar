import type { Metadata } from "next";
import { Award, Clock, Droplets, Facebook, Instagram, Lightbulb, MapPin, Phone, ShieldCheck, Users, Zap } from "lucide-react";

export const siteConfig = {
  businessName: "Iluminar",
  legalName: "Iluminar Materiais Elétricos e Construção",
  city: "Sorocaba - SP",
  tagline: "Materiais elétricos e construção",
  /** Page title for metadata; tuned for ~50–60 characters in SERP and social tools */
  seoTitle: "Iluminar | Materiais elétricos e construção em Sorocaba",
  description:
    "Iluminar Sorocaba: elétrica, LED e hidráulica. Atendimento para obras residenciais, comerciais e industriais com produtos de qualidade.",
  addressShort: "Av. Ipanema, 5675 — Jardim Novo Horizonte, Sorocaba — SP",
  addressFull: "Av. Ipanema, 5675 - Jardim Novo Horizonte, Sorocaba - SP, 18071-801",
  phoneLabel: "(15) 99809-5505",
  whatsappUrl: "https://wa.me/+5515998095505?text=Oi,%20vim%20pelo%20site",
  mapsUrl: "https://maps.app.goo.gl/3RRKXu4pCiLGHoL7A",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.5!2d-47.5095!3d-23.4378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDI2JzE2LjAiUyA0N8KwMzAnMzQuMSJX!5e0!3m2!1spt-BR!2sbr!4v1",
  openingHoursLabel: "Seg a Sex • 08:00-18:00 | Sáb • 08:00-13:00 | Dom • Fechado",
  instagramLabel: "@iluminareletricasorocaba",
  instagramUrl: "https://www.instagram.com/iluminareletricasorocaba/",
  facebookUrl: "https://www.facebook.com/61580208818149",
  /** File in /public — Open Graph & Twitter Card (absolute URL via metadataBase) */
  ogImagePath: "/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

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

/** Root `metadata` for `app/layout.tsx` (title, OG, Twitter, keywords, etc.) */
export function getRootMetadata(): Metadata {
  const siteUrl = resolveSiteUrl();
  const metadataBase = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
  const ogImage = {
    url: new URL(siteConfig.ogImagePath, metadataBase).href,
    width: siteConfig.ogImageWidth,
    height: siteConfig.ogImageHeight,
    type: "image/png",
    alt: `${siteConfig.businessName} — ${siteConfig.tagline} em Sorocaba`,
  } as const;

  return {
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
}

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

export const heroHighlights = [
  { icon: "⚡", label: "Elétrica" },
  { icon: "💡", label: "Iluminação" },
  { icon: "🚰", label: "Hidráulica" },
];

export const services = [
  {
    icon: Zap,
    title: "Elétrica",
    description:
      "Linha completa de materiais elétricos para obras e reformas. Fios e cabos, disjuntores, conectores, hastes para aterramento, conduítes e eletrodutos. Qualidade e segurança garantida.",
    items: ["Fios e Cabos", "Disjuntores", "Conectores", "Conduítes", "Eletrodutos"],
  },
  {
    icon: Lightbulb,
    title: "Iluminação",
    description:
      "Soluções completas em iluminação LED. Painéis, perfis, fitas de LED, luminárias, refletores e iluminação para jardim. Produtos modernos, econômicos e eficientes.",
    items: ["Painéis LED", "Fitas LED", "Luminárias", "Refletores", "Iluminação Jardim"],
  },
  {
    icon: Droplets,
    title: "Hidráulica",
    description:
      "Materiais hidráulicos para instalação e manutenção. Torneiras, grelhas, válvulas, sifões e acessórios essenciais. Produtos resistentes e duráveis.",
    items: ["Torneiras", "Grelhas", "Válvulas", "Sifões", "Acessórios"],
  },
];

export const aboutFeatures = [
  { icon: ShieldCheck, title: "Segurança Garantida", description: "Produtos certificados e de qualidade comprovada" },
  { icon: Users, title: "Atendimento Especializado", description: "Orientação técnica para cada projeto" },
  { icon: Award, title: "Melhores Marcas", description: "Trabalhamos com os líderes do mercado" },
];

export const contactItems = [
  {
    icon: MapPin,
    title: "Endereço",
    text: siteConfig.addressFull,
    link: siteConfig.mapsUrl,
  },
  {
    icon: Phone,
    title: "Telefone / WhatsApp",
    text: siteConfig.phoneLabel,
    link: siteConfig.whatsappUrl,
  },
  {
    icon: Clock,
    title: "Horário",
    text: siteConfig.openingHoursLabel,
  },
  {
    icon: Instagram,
    title: "Instagram",
    text: siteConfig.instagramLabel,
    link: siteConfig.instagramUrl,
  },
];

export const socialLinks = [
  { label: "Instagram", url: siteConfig.instagramUrl, icon: Instagram },
  { label: "Facebook", url: siteConfig.facebookUrl, icon: Facebook },
];
