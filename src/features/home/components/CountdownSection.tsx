"use client";

import { FC, useEffect, useState } from "react";
import { WEDDING_DATE_ISO, weddingData } from "../constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (target: Date): TimeLeft => {
  const diff = target.getTime() - new Date().getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

interface CountBoxProps {
  value: number;
  label: string;
}

const CountBox: FC<CountBoxProps> = ({ value, label }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-sm border border-gold-500/40 bg-charcoal-900/80 backdrop-blur-sm md:h-28 md:w-28">
        <div className="pointer-events-none absolute inset-1 border border-gold-500/15" />
        <span className="font-display text-3xl italic text-gold-300 md:text-5xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-3 font-body text-[10px] uppercase tracking-[0.3em] text-white/45 md:text-xs">
        {label}
      </p>
    </div>
  );
};

const CountdownSection: FC = () => {
  const targetDate = new Date(WEDDING_DATE_ISO);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set nilai awal setelah mount (hindari hydration mismatch)
    setTimeLeft(calculateTimeLeft(targetDate));
    setMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { weddingDateDisplay } = weddingData;

  return (
    <section className="section-reveal relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.5em] text-gold-400/80">
          Counting Down To
        </p>
        <h2 className="mb-2 font-display text-4xl italic md:text-5xl">
          <span className="gold-shimmer">Hari Bahagia Kami</span>
        </h2>
        <p className="mb-2 font-body text-sm tracking-[0.3em] text-white/45">
          {weddingDateDisplay.day.toUpperCase()} ·{" "}
          {weddingDateDisplay.date} {weddingDateDisplay.month.toUpperCase()} ·{" "}
          {weddingDateDisplay.year}
        </p>

        <div className="ornament-line mx-auto my-8 w-40" />

        <div className="flex justify-center gap-3 md:gap-6">
          <CountBox value={mounted ? timeLeft.days : 0} label="Hari" />
          <CountBox value={mounted ? timeLeft.hours : 0} label="Jam" />
          <CountBox value={mounted ? timeLeft.minutes : 0} label="Menit" />
          <CountBox value={mounted ? timeLeft.seconds : 0} label="Detik" />
        </div>

        <p className="mx-auto mt-10 max-w-md font-body text-sm leading-relaxed text-white/50 md:text-base">
          Dengan penuh sukacita, kami mengundang Anda untuk hadir dan
          memberikan doa restu di hari pernikahan kami.
        </p>
      </div>
    </section>
  );
};

export default CountdownSection;
