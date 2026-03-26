import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
};

const GallerySection = () => {
  const MOBILE_VISIBLE = 8;
  const DESKTOP_VISIBLE = 9;
  const SWIPE_THRESHOLD = 40;

  const ref = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(MOBILE_VISIBLE);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const initialVisible = isDesktop ? DESKTOP_VISIBLE : MOBILE_VISIBLE;

  const displayedImages = useMemo(
    () => images.slice(0, visibleCount),
    [images, visibleCount],
  );
  const hasMoreImages = visibleCount < images.length;
  const canShowLess = visibleCount > initialVisible;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);
      setVisibleCount((prev) => {
        const nextInitial = mediaQuery.matches
          ? DESKTOP_VISIBLE
          : MOBILE_VISIBLE;
        return prev < nextInitial ? nextInitial : prev;
      });
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadImages = async () => {
      try {
        const response = await fetch("/data/gallery-images.json", {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as { images?: GalleryImage[] };
        setImages(Array.isArray(data.images) ? data.images : []);
      } catch {
        setImages([]);
      }
    };

    loadImages();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, modalOpen]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;

    if (delta > SWIPE_THRESHOLD) {
      goToPrevious();
    } else if (delta < -SWIPE_THRESHOLD) {
      goToNext();
    }

    touchStartX.current = null;
  };

  return (
    <section id="galeria" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-14 ${visible ? "animate-reveal" : "opacity-0"}`}
        >
          <span className="font-display text-sm uppercase tracking-[0.25em] text-brand">
            Nossa loja
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            GALERIA DE FOTOS
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-balance">
            Conheça de perto a estrutura da Iluminar em Sorocaba e veja nosso
            ambiente preparado para atender obras residenciais, comerciais e
            industriais.
          </p>
        </div>

        {images.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
              {displayedImages.map((image, index) => (
                <figure
                  key={`${image.src}-${index}`}
                  className={`group overflow-hidden rounded-xl border border-brand-blue/15 bg-light shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)] ${
                    visible
                      ? `animate-reveal delay-${((index % 4) + 1) * 100}`
                      : "opacity-0"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => openModal(index)}
                    className="relative block w-full aspect-[4/5] lg:aspect-[3/2]"
                    aria-label={`Abrir imagem ${index + 1}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </figure>
              ))}
            </div>

            {hasMoreImages ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount(
                      (prev) =>
                        prev + (isDesktop ? DESKTOP_VISIBLE : MOBILE_VISIBLE),
                    )
                  }
                  className="rounded-lg bg-brand-blue px-6 py-3 font-display text-sm uppercase tracking-wider text-white transition-colors duration-200 hover:bg-brand-blue/90"
                >
                  Ver mais
                </button>
              </div>
            ) : (
              canShowLess && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount(initialVisible)}
                    className="rounded-lg border border-brand-blue/30 bg-transparent px-6 py-3 font-display text-sm uppercase tracking-wider text-brand-blue transition-colors duration-200 hover:bg-brand-blue/10"
                  >
                    Ver menos
                  </button>
                </div>
              )
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-brand-blue/25 bg-light p-8 text-center text-muted-foreground">
            Adicione imagens em{" "}
            <span className="font-medium text-foreground">
              public/images/gallery
            </span>{" "}
            para exibir a galeria automaticamente.
          </div>
        )}
      </div>

      {modalOpen && images[currentIndex] && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
            aria-label="Fechar galeria"
          >
            <X size={18} />
          </button>

          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/15"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative aspect-[4/5] w-full md:aspect-[16/10]">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
              />

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors duration-200 hover:bg-black/65 md:left-4 md:h-11 md:w-11"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors duration-200 hover:bg-black/65 md:right-4 md:h-11 md:w-11"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs text-white/90">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
