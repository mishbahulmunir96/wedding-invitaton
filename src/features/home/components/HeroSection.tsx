"use client";

import { useWeddingVersion } from "@/hooks/useWeddingVersion";
import { ChevronDown } from "lucide-react";
import { FC } from "react";

const HeroSection: FC = () => {
  const { data, first, second } = useWeddingVersion();
  const { weddingDateDisplay } = data;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.07] blur-[140px]" />
        <div className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-navy-700/30 blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute left-6 top-6 h-16 w-16 border-l border-t border-gold-500/30" />
      <div className="pointer-events-none absolute right-6 top-6 h-16 w-16 border-r border-t border-gold-500/30" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-16 w-16 border-b border-l border-gold-500/30" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-16 w-16 border-b border-r border-gold-500/30" />

      <div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        style={{ animation: "fadeUp 1.4s ease forwards" }}
      >
        <p className="mb-2 font-body text-xs uppercase tracking-[0.5em] text-gold-400/80">
          The Wedding Of
        </p>

        <div className="ornament-line mb-8 w-40" />

        <h1 className="mb-2 font-display text-5xl italic leading-[1.05] text-gold-100 md:text-7xl lg:text-8xl">
          <span className="gold-shimmer block">{first.nickname}</span>
          <span className="my-2 inline-block font-script text-3xl text-gold-400 md:text-5xl">
            &
          </span>
          <span className="gold-shimmer block">{second.nickname}</span>
        </h1>

        <p className="mb-8 font-body text-xs uppercase tracking-[0.4em] text-white/45 md:text-sm">
          {first.name} &nbsp;·&nbsp; {second.name}
        </p>

        <div className="ornament-line mb-8 w-40" />

        <div className="mb-10 flex items-center justify-center gap-6 md:gap-10">
          <div className="text-center">
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/45 md:text-xs">
              {weddingDateDisplay.day}
            </p>
          </div>
          <div className="h-12 w-px bg-gold-500/40" />
          <div className="text-center">
            <p className="font-display text-5xl italic text-gold-300 md:text-6xl">
              {weddingDateDisplay.date}
            </p>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-400 md:text-xs">
              {weddingDateDisplay.month}
            </p>
          </div>
          <div className="h-12 w-px bg-gold-500/40" />
          <div className="text-center">
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/45 md:text-xs">
              {weddingDateDisplay.year}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-xl space-y-4 px-4">
          <p
            className="font-display text-lg italic leading-relaxed text-white/60 md:text-xl"
            dir="rtl"
            lang="ar"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="font-body text-sm leading-relaxed text-white/45 md:text-base">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia
            menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu
            cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di
            antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p className="font-script text-base text-gold-400 md:text-lg">
            — QS. Ar-Rum: 21
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        <ChevronDown className="h-6 w-6 text-gold-400/60" />
      </div>
    </section>
  );
};

export default HeroSection;
