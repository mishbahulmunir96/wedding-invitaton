"use client";

import useCreateRsvp from "@/hooks/api/rsvp/useCreateRsvp";
import { RsvpFormValues } from "@/types/rsvp";
import { Check, Loader2, Users } from "lucide-react";
import { useFormik } from "formik";
import { FC } from "react";
import { RsvpSchema } from "../schema";

interface AttendanceOption {
  value: "hadir" | "tidak_hadir" | "ragu";
  label: string;
}

const ATTENDANCE_OPTIONS: AttendanceOption[] = [
  { value: "hadir", label: "Hadir" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
  { value: "ragu", label: "Masih Ragu" },
];

const RSVPSection: FC = () => {
  const { mutateAsync: createRsvp, isPending } = useCreateRsvp();

  const formik = useFormik<RsvpFormValues>({
    initialValues: {
      name: "",
      attendance: "",
      guestCount: 1,
    },
    validationSchema: RsvpSchema,
    onSubmit: async (values, { resetForm }) => {
      await createRsvp(values);
      resetForm();
    },
  });

  return (
    <section className="section-reveal relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.5em] text-gold-400/80">
            Kindly Respond
          </p>
          <h2 className="font-display text-4xl italic md:text-5xl">
            <span className="gold-shimmer">Konfirmasi Kehadiran</span>
          </h2>
          <div className="ornament-line mx-auto mt-6 w-40" />
          <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-white/50 md:text-base">
            Mohon berkenan untuk mengisi konfirmasi kehadiran di bawah ini.
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="relative rounded-sm border border-gold-500/30 bg-gradient-to-b from-charcoal-900/80 to-navy-900/40 p-6 backdrop-blur-sm md:p-10"
        >
          <div className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 border-l border-t border-gold-500" />
          <div className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 border-r border-t border-gold-500" />
          <div className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 border-b border-l border-gold-500" />
          <div className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b border-r border-gold-500" />

          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400"
              >
                Nama
              </label>
              <input
                id="name"
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
              <span className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400">
                Konfirmasi Kehadiran
              </span>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {ATTENDANCE_OPTIONS.map((opt) => {
                  const checked = formik.values.attendance === opt.value;
                  return (
                    <label
                      key={opt.value}
                      htmlFor={`attendance-${opt.value}`}
                      className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-sm border px-4 py-3 font-body text-sm transition ${
                        checked
                          ? "border-gold-400 bg-gold-500/10 text-gold-200"
                          : "border-gold-500/30 text-white/50 hover:border-gold-500/60"
                      }`}
                    >
                      <input
                        id={`attendance-${opt.value}`}
                        type="radio"
                        name="attendance"
                        value={opt.value}
                        checked={checked}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="sr-only"
                      />
                      {checked && <Check className="h-4 w-4" />}
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
              {!!formik.touched.attendance && !!formik.errors.attendance ? (
                <p className="mt-2 text-xs text-red-400">
                  {formik.errors.attendance}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="guestCount"
                className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400"
              >
                Jumlah Tamu
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400/70" />
                <input
                  id="guestCount"
                  type="number"
                  name="guestCount"
                  min={1}
                  max={10}
                  value={formik.values.guestCount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-sm border border-gold-500/30 bg-charcoal-950/60 py-3 pl-11 pr-4 font-body text-sm text-white/70 placeholder:text-white/20 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-500/40"
                />
              </div>
              {!!formik.touched.guestCount && !!formik.errors.guestCount ? (
                <p className="mt-1 text-xs text-red-400">
                  {formik.errors.guestCount}
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
                <span>Kirim Konfirmasi</span>
              )}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-300/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RSVPSection;
