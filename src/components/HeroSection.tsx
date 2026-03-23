import { heroHighlights, siteConfig } from "@/config/site";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-dark overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top,_rgba(248,200,8,0.24),_transparent_42%),radial-gradient(circle_at_75%_35%,_rgba(8,72,152,0.22),_transparent_44%),linear-gradient(120deg,_rgba(248,200,8,0.12),_rgba(8,72,152,0.1)_60%,_transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl animate-reveal">
          <span className="inline-block font-display text-sm uppercase tracking-[0.25em] text-brand mb-6">
            Sorocaba — SP
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-6">
            MATERIAIS ELÉTRICOS E CONSTRUÇÃO
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-lg mb-10">
            Referência em materiais elétricos, iluminação LED e hidráulica. Qualidade, segurança e o melhor custo-benefício para sua obra.
          </p>
          <div className="flex flex-wrap gap-4">
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
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg animate-reveal delay-200">
          {heroHighlights.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-display text-xs uppercase tracking-widest text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
