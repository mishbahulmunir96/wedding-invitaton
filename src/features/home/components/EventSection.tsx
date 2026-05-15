"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { FC } from "react";
import { weddingData } from "../constants";
import { WeddingEvent } from "@/types/wedding";

interface EventCardProps {
  event: WeddingEvent;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <div className="group relative">
      <div className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 border-l border-t border-gold-500/60 transition group-hover:border-gold-400" />
      <div className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 border-r border-t border-gold-500/60 transition group-hover:border-gold-400" />
      <div className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 border-b border-l border-gold-500/60 transition group-hover:border-gold-400" />
      <div className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b border-r border-gold-500/60 transition group-hover:border-gold-400" />

      <div className="relative flex h-full flex-col items-center rounded-sm border border-gold-500/20 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/60 to-navy-900/40 p-8 backdrop-blur-sm transition group-hover:border-gold-500/40 md:p-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/50 bg-charcoal-900 text-3xl">
          <span aria-hidden="true">{event.icon}</span>
        </div>

        <h3 className="mb-1 font-display text-3xl italic md:text-4xl">
          <span className="gold-shimmer">{event.type}</span>
        </h3>

        <div className="ornament-line my-5 w-32" />

        <div className="w-full space-y-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <Calendar className="h-4 w-4 text-gold-400" />
            <p className="font-body text-sm text-white/60 md:text-base">
              {event.date}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Clock className="h-4 w-4 text-gold-400" />
            <p className="font-body text-sm text-white/60 md:text-base">
              {event.time}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <MapPin className="h-4 w-4 text-gold-400" />
            <p className="font-body text-sm font-medium text-white/60 md:text-base">
              {event.venue}
            </p>
            <p className="mx-auto max-w-[280px] font-body text-xs leading-relaxed text-white/40">
              {event.address}
            </p>
          </div>
        </div>

        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-sm border border-gold-500/50 px-5 py-2 font-body text-xs uppercase tracking-[0.3em] text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-200"
        >
          <MapPin className="h-3.5 w-3.5" />
          <span>Lihat Lokasi</span>
        </a>
      </div>
    </div>
  );
};

const EventSection: FC = () => {
  const { events } = weddingData;

  return (
    <section className="section-reveal relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.5em] text-gold-400/80">
            Save The Date
          </p>
          <h2 className="font-display text-4xl italic md:text-5xl">
            <span className="gold-shimmer">Rangkaian Acara</span>
          </h2>
          <div className="ornament-line mx-auto mt-6 w-40" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {events.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center font-body text-sm leading-relaxed text-white/40 md:text-base">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
      </div>
    </section>
  );
};

export default EventSection;
