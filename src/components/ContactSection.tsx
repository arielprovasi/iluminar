import { useEffect, useRef, useState } from "react";
import { contactItems, siteConfig } from "@/config/site";

const ContactSection = () => {
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
    <section id="contato" className="py-24 md:py-32 bg-light" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${visible ? "animate-reveal" : "opacity-0"}`}>
          <span className="font-display text-sm uppercase tracking-[0.25em] text-brand">
            Onde estamos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            VENHA NOS VISITAR
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={visible ? "animate-reveal delay-100" : "opacity-0"}>
            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm uppercase tracking-wider font-semibold mb-1">
                      {item.title}
                    </h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-brand-blue transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 bg-brand text-foreground font-display text-sm uppercase tracking-wider px-8 py-4 rounded hover:bg-brand-dark transition-colors duration-200 active:scale-[0.97]"
            >
              Falar no WhatsApp
            </a>
          </div>

          {/* Google Maps embed */}
          <div className={`rounded-lg overflow-hidden shadow-lg ${visible ? "animate-reveal delay-200" : "opacity-0"}`}>
            <iframe
              src={siteConfig.mapsEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Iluminar"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
