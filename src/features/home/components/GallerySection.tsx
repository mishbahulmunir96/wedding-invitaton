"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { galleryImages } from "../constants";

const GallerySection: FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIdx(null), []);

  const showPrev = useCallback(() => {
    setActiveIdx((curr) =>
      curr === null
        ? null
        : (curr - 1 + galleryImages.length) % galleryImages.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIdx((curr) =>
      curr === null ? null : (curr + 1) % galleryImages.length,
    );
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeIdx, closeLightbox, showPrev, showNext]);

  return (
    <section className="section-reveal relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.5em] text-gold-400/80">
            Our Memories
          </p>
          <h2 className="font-display text-4xl italic md:text-5xl">
            <span className="gold-shimmer">Galeri Kami</span>
          </h2>
          <div className="ornament-line mx-auto mt-6 w-40" />
          <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-white/50 md:text-base">
            Setiap momen bersama adalah hadiah. Berikut beberapa kenangan
            sebelum kami melangkah ke jenjang baru.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`group relative overflow-hidden rounded-sm border border-gold-500/20 bg-charcoal-800 transition hover:border-gold-500/60 ${
                idx === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""
              }`}
              aria-label={`Buka ${img.alt}`}
            >
              <div className={`relative ${idx === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover grayscale-[20%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent opacity-60 transition group-hover:opacity-30" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-950/95 px-4 py-12 backdrop-blur-sm"
          onClick={closeLightbox}
          style={{ animation: "fadeIn 0.3s ease forwards" }}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Tutup"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 bg-charcoal-900/80 text-gold-300 transition hover:border-gold-400 hover:text-gold-200"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/40 bg-charcoal-900/80 text-gold-300 transition hover:border-gold-400 hover:text-gold-200 md:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Foto berikutnya"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/40 bg-charcoal-900/80 text-gold-300 transition hover:border-gold-400 hover:text-gold-200 md:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="relative flex max-h-full max-w-4xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-[90vw] max-w-3xl md:h-[80vh]">
              <Image
                src={galleryImages[activeIdx].src}
                alt={galleryImages[activeIdx].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-xs uppercase tracking-[0.3em] text-white/45">
              {activeIdx + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
