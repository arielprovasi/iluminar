import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Clock3, MapPin, MessageCircle } from "lucide-react";
import { navLinks, siteConfig, socialLinks } from "@/config/site";
import logoIluminar from "@/assets/logo-iluminar.png";

const Footer = () => (
  <footer className="bg-dark border-t border-white/10 py-14">
    <div className="container mx-auto px-4">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-2">
          <Link
            href="/"
            className="flex w-full items-center justify-center md:w-auto md:justify-start"
            aria-label={`${siteConfig.businessName} - Voltar ao topo`}
          >
            <Image
              src={logoIluminar}
              alt={`${siteConfig.businessName} logo`}
              className="h-28 w-auto md:h-28"
            />
          </Link>
          <p className="max-w-xl text-sm leading-relaxed text-white/70 text-balance">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/90">
            Links rápidos
          </h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
            Contato
          </h3>
          <div className="space-y-3 text-sm text-white/70">
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 transition-colors duration-200 hover:text-white"
            >
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{siteConfig.addressShort}</span>
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
            >
              <MessageCircle size={16} className="shrink-0" />
              <span>{siteConfig.phoneLabel}</span>
            </a>
            <p className="flex items-center gap-2">
              <Clock3 size={16} className="shrink-0" />
              <span>{siteConfig.openingHoursLabel}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-brand-blue hover:text-white"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-6 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} Todos os direitos reservados -{" "}
          <a
            href="https://www.instagram.com/apertaqual/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white/70 transition-colors duration-200 hover:text-white"
          >
            AGÊNCIA APQ
          </a>
        </p>
        <a
          href="#inicio"
          className="inline-flex items-center justify-center gap-3 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
        >
          <span>Voltar ao topo</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 transition-colors duration-200 hover:bg-white/20">
            <ArrowUp size={16} />
          </span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
