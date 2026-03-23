import { Award, Clock, Droplets, Facebook, Instagram, Lightbulb, MapPin, Phone, ShieldCheck, Users, Zap } from "lucide-react";

import { siteConfig } from "./site-config";

export { siteConfig };

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
