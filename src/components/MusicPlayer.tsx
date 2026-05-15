"use client";

import { Volume2, VolumeX } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

const MusicPlayer: FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Auto-attempt to play setelah komponen mount (envelope sudah dibuka,
  // jadi browser sudah punya user gesture).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/background.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        type="button"
        aria-label={playing ? "Matikan musik" : "Nyalakan musik"}
        className="pulse-gold fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 bg-charcoal-900/90 text-gold-400 shadow-lg backdrop-blur-md transition hover:bg-charcoal-800 hover:text-gold-300"
      >
        {playing ? (
          <Volume2 className="h-5 w-5 animate-pulse" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </button>
    </>
  );
};

export default MusicPlayer;
