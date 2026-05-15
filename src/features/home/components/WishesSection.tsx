"use client";

import useCreateWish from "@/hooks/api/wish/useCreateWish";
import useGetWishes from "@/hooks/api/wish/useGetWishes";
import { Wish, WishFormValues } from "@/types/wish";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

import { useFormik } from "formik";
import { Heart, Loader2, MessageCircle, Send } from "lucide-react";
import { FC } from "react";
import { WishSchema } from "../schema";

interface WishCardProps {
  wish: Wish;
}

const WishCard: FC<WishCardProps> = ({ wish }) => {
  return (
    <div className="relative rounded-sm border border-gold-500/20 bg-charcoal-900/60 p-5 backdrop-blur-sm transition hover:border-gold-500/40">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 bg-charcoal-800 font-display text-sm italic text-gold-300">
          {wish.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-body text-sm font-medium text-gold-200">
            {wish.name}
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/40">
            {format(new Date(wish.createdAt), "dd MMM yyyy · HH:mm", {
              locale: localeId,
            })}
          </p>
        </div>
        <Heart className="h-4 w-4 shrink-0 text-gold-400/60" />
      </div>
      <p className="whitespace-pre-wrap break-words font-body text-sm leading-relaxed text-white/70">
        {wish.message}
      </p>
    </div>
  );
};

const WishesSection: FC = () => {
  const { mutateAsync: createWish, isPending } = useCreateWish();
  const { data: wishes = [], isLoading } = useGetWishes();

  const formik = useFormik<WishFormValues>({
    initialValues: {
      name: "",
      message: "",
    },
    validationSchema: WishSchema,
    onSubmit: async (values, { resetForm }) => {
      await createWish(values);
      resetForm();
    },
  });

  return (
    <section className="section-reveal relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.5em] text-gold-400/80">
            Send Your Wishes
          </p>
          <h2 className="font-display text-4xl italic md:text-5xl">
            <span className="gold-shimmer">Ucapan &amp; Doa</span>
          </h2>
          <div className="ornament-line mx-auto mt-6 w-40" />
          <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-white/50 md:text-base">
            Berikan doa terbaik Anda untuk kami yang akan memulai perjalanan
            baru ini.
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="relative mb-10 rounded-sm border border-gold-500/30 bg-gradient-to-b from-charcoal-900/80 to-navy-900/40 p-6 backdrop-blur-sm md:p-8"
        >
          <div className="pointer-events-none absolute -left-2 -top-2 h-7 w-7 border-l border-t border-gold-500/60" />
          <div className="pointer-events-none absolute -right-2 -top-2 h-7 w-7 border-r border-t border-gold-500/60" />
          <div className="pointer-events-none absolute -bottom-2 -left-2 h-7 w-7 border-b border-l border-gold-500/60" />
          <div className="pointer-events-none absolute -bottom-2 -right-2 h-7 w-7 border-b border-r border-gold-500/60" />

          <div className="space-y-5">
            <div>
              <label
                htmlFor="wish-name"
                className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400"
              >
                Nama
              </label>
              <input
                id="wish-name"
                type="text"
                name="name"
                placeholder="Nama Anda"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-sm border border-gold-500/30 bg-charcoal-950/60 px-4 py-3 font-body text-sm text-white/70 placeholder:text-white/20 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-500/40"
              />
              {!!formik.touched.name && !!formik.errors.name ? (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="wish-message"
                className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400"
              >
                Ucapan &amp; Doa
              </label>
              <textarea
                id="wish-message"
                name="message"
                rows={4}
                placeholder="Tulis ucapan dan doa terbaik Anda..."
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full resize-none rounded-sm border border-gold-500/30 bg-charcoal-950/60 px-4 py-3 font-body text-sm text-white/70 placeholder:text-white/20 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-500/40"
              />
              {!!formik.touched.message && !!formik.errors.message ? (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-sm border border-gold-500/60 bg-gold-500/10 px-8 py-3 font-body text-sm uppercase tracking-[0.3em] text-gold-200 transition hover:border-gold-400 hover:bg-gold-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Kirim Ucapan</span>
                </>
              )}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-300/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        </form>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.3em] text-gold-400">
              <MessageCircle className="h-4 w-4" />
              <span>Ucapan dari Tamu</span>
            </h3>
            <span className="font-body text-xs text-white/40">
              {wishes.length} ucapan
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gold-400" />
            </div>
          ) : wishes.length === 0 ? (
            <div className="rounded-sm border border-dashed border-gold-500/20 px-6 py-10 text-center">
              <Heart className="mx-auto mb-3 h-6 w-6 text-gold-400/60" />
              <p className="font-body text-sm text-white/40">
                Belum ada ucapan. Jadilah yang pertama!
              </p>
            </div>
          ) : (
            <div className="grid max-h-[500px] grid-cols-1 gap-4 overflow-y-auto pr-2 md:grid-cols-2">
              {wishes.map((wish) => (
                <WishCard key={wish.id} wish={wish} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
