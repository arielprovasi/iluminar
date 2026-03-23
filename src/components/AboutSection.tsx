import { useEffect, useRef, useState } from "react";
import { aboutFeatures, siteConfig } from "@/config/site";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="sobre" className="py-24 md:py-32 section-dark" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={visible ? "animate-reveal" : "opacity-0"}>
            <span className="font-display text-sm uppercase tracking-[0.25em] text-brand">
              Sobre nós
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
              REFERÊNCIA EM SOROCABA
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6 text-balance">
              A {siteConfig.legalName} oferece soluções completas para obras
              residenciais, comerciais e industriais. Trabalhamos com produtos
              de qualidade, das melhores marcas, garantindo segurança,
              eficiência e ótimo custo-benefício.
            </p>
            <p className="text-white/70 text-lg leading-relaxed text-balance">
              Nossa equipe oferece atendimento especializado e orientação
              técnica para cada projeto, do básico ao acabamento. Mais que
              vender, buscamos transformar ambientes, realizar sonhos e
              construir com solidez e confiança.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 gap-6 ${visible ? "animate-reveal delay-200" : "opacity-0"}`}
          >
            {aboutFeatures.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-5 p-5 rounded-lg bg-white/5 hover:bg-white/[0.08] transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-brand/15 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
