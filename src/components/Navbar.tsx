import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import logoIluminar from "@/assets/logo-iluminar.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-brand-blue/40">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#inicio" className="flex items-center gap-2">
          <Image
            src={logoIluminar}
            alt={`${siteConfig.businessName} logo`}
            className="h-14 w-auto md:h-16"
            priority
          />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-sm uppercase tracking-widest text-white/80 hover:text-brand-blue transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand text-foreground font-display text-sm uppercase tracking-wider px-5 py-2.5 rounded hover:bg-brand-dark transition-colors duration-200 active:scale-[0.97]"
            >
              Fale Conosco
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark border-t border-white/10 px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-sm uppercase tracking-widest text-white/80 hover:text-brand-blue transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand text-foreground font-display text-sm uppercase tracking-wider px-5 py-2.5 rounded"
              >
                Fale Conosco
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
