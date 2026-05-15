"use client";

import { Mail } from "lucide-react";
import { useQueryState } from "nuqs";
import { FC } from "react";
import { weddingData } from "../constants";

interface EnvelopeOpenerProps {
  onOpen: () => void;
}

const EnvelopeOpener: FC<EnvelopeOpenerProps> = ({ onOpen }) => {
  const { groom, bride, weddingDateDisplay } = weddingData;
  const [guestName] = useQueryState("to");
  const [guestAddress] = useQueryState("alamat");

  return (
    <div className="noise-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-charcoal-950 px-6 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute left-6 top-6 h-12 w-12 border-l border-t border-gold-500/40" />
      <div className="pointer-events-none absolute right-6 top-6 h-12 w-12 border-r border-t border-gold-500/40" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-12 w-12 border-b border-l border-gold-500/40" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-12 w-12 border-b border-r border-gold-500/40" />

      <div
        className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
        style={{ animation: "fadeUp 1.2s ease forwards" }}
      >
        <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-gold-400/80">
          The Wedding Of
        </p>

        <div className="ornament-line mb-6 w-32" />

        <div
          className="relative mb-10 h-36 w-44"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <span className="gold-shimmer font-monogram absolute left-2 top-0 text-7xl leading-none font-bold">
            {bride.initial}
          </span>
          <span className="font-script absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gold-400/50">
            &
          </span>
          <span className="gold-shimmer font-monogram absolute bottom-0 right-2 text-7xl leading-none font-bold">
            {groom.initial}
          </span>
        </div>

        <h1 className="mb-2 font-display text-3xl italic leading-tight md:text-4xl">
          <span className="gold-shimmer">{bride.nickname}</span>
          <span className="mx-2 font-script text-gold-400">&</span>
          <span className="gold-shimmer">{groom.nickname}</span>
        </h1>

        <p className="mb-6 font-body text-sm tracking-[0.3em] text-white/45">
          {weddingDateDisplay.day.toUpperCase()} ·{" "}
          {weddingDateDisplay.date} {weddingDateDisplay.month.toUpperCase()} ·{" "}
          {weddingDateDisplay.year}
        </p>

        <div className="ornament-line mb-8 w-32" />

        <p className="mb-2 font-body text-sm text-white/45">
          Kepada Yth.
        </p>
        {guestName ? (
          <div className="mb-8">
            <p className="font-script text-2xl text-gold-300">{guestName}</p>
            {guestAddress && (
              <div className="mt-1">
                <p className="font-body text-xs text-white/40">di-</p>
                <p className="font-body text-xs leading-relaxed text-white/40">
                  {guestAddress}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="mb-8 font-script text-2xl text-gold-300">
            Tamu Undangan
          </p>
        )}

        <button
          type="button"
          onClick={onOpen}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm border border-gold-500/60 bg-charcoal-900/60 px-8 py-3 font-body text-sm uppercase tracking-[0.3em] text-gold-300 backdrop-blur-sm transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-200"
        >
          <Mail className="h-4 w-4 transition group-hover:translate-x-[-2px]" />
          <span>Buka Undangan</span>
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-300/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>
    </div>
  );
};

export default EnvelopeOpener;
