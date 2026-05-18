"use client";

import { useWeddingVersion } from "@/hooks/useWeddingVersion";
import { FC } from "react";
import { Person } from "@/types/wedding";

interface CoupleCardProps {
  person: Person;
  reverse?: boolean;
}

const CoupleCard: FC<CoupleCardProps> = ({ person, reverse }) => {
  return (
    <div
      className={`flex flex-col items-center text-center ${
        reverse ? "md:order-2" : ""
      }`}
    >
      <h3 className="mb-1 font-display text-3xl italic leading-tight md:text-4xl">
        <span className="gold-shimmer">{person.name}</span>
      </h3>

      <p className="mb-4 font-body text-[10px] uppercase tracking-[0.4em] text-gold-400">
        {person.order} dari
      </p>

      <div className="ornament-line my-4 w-32" />

      <div className="space-y-1 font-body text-sm text-white/60 md:text-base">
        <p>{person.parents.father}</p>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          &amp;
        </p>
        <p>{person.parents.mother}</p>
      </div>

      <p className="mt-4 max-w-[280px] font-body text-xs leading-relaxed text-white/40">
        {person.address}
      </p>

      {/* <button
        type="button"
        aria-label={`Instagram ${person.name}`}
        className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition hover:border-gold-400 hover:text-gold-300"
      >
        <Instagram className="h-4 w-4" />
      </button> */}
    </div>
  );
};

const CoupleSection: FC = () => {
  const { first, second } = useWeddingVersion();

  return (
    <section className="section-reveal relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.5em] text-gold-400/80">
            The Couple
          </p>
          <h2 className="font-display text-4xl italic md:text-5xl">
            <span className="gold-shimmer">Mempelai</span>
          </h2>
          <div className="ornament-line mx-auto mt-6 w-40" />
        </div>

        <div className="relative grid grid-cols-1 gap-16 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center">
          <CoupleCard person={first} />

          <div className="flex items-center justify-center">
            <div
              className="font-script text-7xl text-gold-400 md:text-8xl"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              &amp;
            </div>
          </div>

          <CoupleCard person={second} reverse />
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
