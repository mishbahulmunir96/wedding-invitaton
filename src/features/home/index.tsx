"use client";

import { useEffect, useState } from "react";
import EnvelopeOpener from "./components/EnvelopeOpener";
import HeroSection from "./components/HeroSection";
import CoupleSection from "./components/CoupleSection";
import CountdownSection from "./components/CountdownSection";
import EventSection from "./components/EventSection";
import GallerySection from "./components/GallerySection";
import RSVPSection from "./components/RSVPSection";
import GiftSection from "./components/GiftSection";
import WishesSection from "./components/WishesSection";
import MusicPlayer from "@/components/MusicPlayer";
import FloralDivider from "@/components/FloralDivider";

const HomePage = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".section-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [opened]);

  if (!opened) {
    return <EnvelopeOpener onOpen={() => setOpened(true)} />;
  }

  return (
    <main className="noise-bg relative min-h-screen bg-charcoal-950">
      <MusicPlayer />
      <HeroSection />
      <FloralDivider />
      <CoupleSection />
      <FloralDivider flipped />
      <CountdownSection />
      <FloralDivider />
      <EventSection />
      <FloralDivider flipped />
      {/* <GallerySection /> */}
      {/* <FloralDivider /> */}
      <RSVPSection />
      <FloralDivider flipped />
      <GiftSection />
      <FloralDivider />
      <WishesSection />
      <footer className="py-10 text-center font-body text-xs uppercase tracking-widest text-white/45">
        <p>Made with ❤ for Mishbahul Munir & Kuni Sa&apos;adati · 2026</p>
      </footer>
    </main>
  );
};

export default HomePage;
