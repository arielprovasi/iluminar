import { useEffect, useRef, useState } from "react";
import { services } from "@/config/site";

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="servicos" className="py-24 md:py-32 bg-light" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${visible ? "animate-reveal" : "opacity-0"}`}>
          <span className="font-display text-sm uppercase tracking-[0.25em] text-brand">
            O que oferecemos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            NOSSOS SERVIÇOS
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`bg-background rounded-lg p-8 border border-brand-blue/15 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)] transition-shadow duration-300 ${
                visible ? `animate-reveal delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="w-14 h-14 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-6">
                <s.icon className="w-7 h-7 text-brand-blue" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{s.description}</p>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs font-medium uppercase tracking-wider bg-brand/10 text-foreground px-3 py-1.5 rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
