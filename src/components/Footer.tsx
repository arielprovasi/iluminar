import Image from "next/image";
import { siteConfig, socialLinks } from "@/config/site";
import logoIluminar from "@/assets/logo-iluminar.png";

const Footer = () => (
  <footer className="bg-dark py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Image
            src={logoIluminar}
            alt={`${siteConfig.businessName} logo`}
            className="h-20 w-auto"
          />
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-brand-blue hover:text-white transition-colors duration-200"
              aria-label={link.label}
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10 text-center">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} {siteConfig.legalName}. Todos os direitos reservados.
        </p>
        <p className="text-white/30 text-xs mt-2">
          {siteConfig.addressShort}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
