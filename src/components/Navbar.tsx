import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import logoIluminar from "@/assets/logo-iluminar.png";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-b from-black/80 to-black/45 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6 px-4 md:h-20 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoIluminar}
            alt={`${siteConfig.businessName} logo`}
            className="h-16 w-auto md:h-16"
            priority
          />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-sm uppercase tracking-widest text-white/70 transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-lg bg-brand-blue px-5 py-2.5 font-display text-sm uppercase tracking-wider text-white transition-all duration-200 hover:bg-brand-blue/90 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] active:scale-[0.97] md:inline-block"
        >
          Fale Conosco
        </a>

        {/* Mobile toggle */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="justify-self-end p-2 text-white md:hidden" aria-label="Menu">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="border-0 bg-black/75 backdrop-blur-lg md:hidden">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <ul className="mt-3 flex flex-col gap-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <SheetClose asChild>
                    <a
                      href={l.href}
                      className="font-display text-sm uppercase tracking-widest text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-brand-blue px-5 py-2.5 font-display text-sm uppercase tracking-wider text-white"
                >
                  Fale Conosco
                </a>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
