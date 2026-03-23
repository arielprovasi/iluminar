import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services } from "@/config/site";
import { Badge } from "@/components/ui/badge";

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [serviceImages, setServiceImages] = useState<string[]>([]);

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

  useEffect(() => {
    const controller = new AbortController();

    const loadServiceImages = async () => {
      try {
        const response = await fetch("/api/services-images", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) return;

        const data = (await response.json()) as { images?: string[] };
        setServiceImages(Array.isArray(data.images) ? data.images : []);
      } catch {
        setServiceImages([]);
      }
    };

    loadServiceImages();

    return () => controller.abort();
  }, []);

  return (
    <section id="servicos" className="py-24 md:py-32 bg-light" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${visible ? "animate-reveal" : "opacity-0"}`}
        >
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
              {serviceImages[i] && (
                <div className="mb-6 overflow-hidden rounded-lg border border-brand-blue/15">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={serviceImages[i]}
                      alt={`Imagem de ${s.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-blue/10">
                  <s.icon
                    className="h-7 w-7 text-brand-blue"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold">
                  {s.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 text-balance">
                {s.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li key={item}>
                    <Badge variant="outline" className="px-2.5 py-1 text-[11px]">
                      {item}
                    </Badge>
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
