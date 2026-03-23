import { heroHighlights, siteConfig } from "@/config/site";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center bg-dark overflow-hidden"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("/images/hero/iluminar-loja-de-materiais-eletricos-e-materiais-para-constru%C3%A7%C3%A3o-em-sorocaba%20(38).jpg")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl animate-reveal">
          <span className="inline-block font-display text-sm uppercase tracking-[0.25em] text-brand mb-6">
            Sorocaba — SP
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.12] md:leading-[1.08] mb-6">
            MATERIAIS ELÉTRICOS E CONSTRUÇÃO
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed text-balance max-w-lg mb-10">
            Referência em materiais elétricos, iluminação LED e hidráulica.
            Qualidade, segurança e o melhor custo-benefício para sua obra.
          </p>
          <div className="w-fit max-w-full">
            <div className="flex flex-wrap gap-4 md:flex-nowrap">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand text-foreground font-display text-base uppercase tracking-wider px-8 py-4 rounded hover:bg-brand-dark transition-colors duration-200 active:scale-[0.97]"
              >
                Peça um Orçamento
              </a>
              <a
                href="#servicos"
                className="border border-brand-blue text-white font-display text-base uppercase tracking-wider px-8 py-4 rounded hover:bg-brand-blue hover:text-white transition-colors duration-200 active:scale-[0.97]"
              >
                Nossos Serviços
              </a>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-6 md:gap-8 animate-reveal delay-200">
              {heroHighlights.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl mb-1">{s.icon}</div>
                  <div className="font-display text-xs uppercase tracking-widest text-white/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
