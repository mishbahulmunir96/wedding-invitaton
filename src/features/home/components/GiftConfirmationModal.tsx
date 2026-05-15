"use client";

import useSubmitGiftConfirmation from "@/hooks/api/gift/useSubmitGiftConfirmation";
import { GiftConfirmationSchema } from "../schema/giftConfirmationSchema";
import { GiftConfirmationFormValues } from "@/types/gift";
import { useFormik } from "formik";
import { Loader2, Upload, X } from "lucide-react";
import { FC, useEffect, useRef } from "react";

interface GiftConfirmationModalProps {
  onClose: () => void;
}

const GiftConfirmationModal: FC<GiftConfirmationModalProps> = ({ onClose }) => {
  const { mutateAsync: submit, isPending } = useSubmitGiftConfirmation();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const formik = useFormik<GiftConfirmationFormValues>({
    initialValues: { name: "", amount: "", message: "", proofFile: null },
    validationSchema: GiftConfirmationSchema,
    onSubmit: async (values, { resetForm }) => {
      await submit(values);
      resetForm();
      onClose();
    },
  });

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const formatAmount = (val: string) => {
    const digits = val.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal-950/90 px-4 py-8 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.2s ease forwards" }}
    >
      <div className="relative w-full max-w-md rounded-sm border border-gold-500/30 bg-charcoal-900 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        <div className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 border-l border-t border-gold-500" />
        <div className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 border-r border-t border-gold-500" />
        <div className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 border-b border-l border-gold-500" />
        <div className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b border-r border-gold-500" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition hover:border-gold-400 hover:text-gold-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 text-center">
          <p className="mb-1 font-body text-xs uppercase tracking-[0.4em] text-gold-400/80">
            Amplop Digital
          </p>
          <h3 className="font-display text-2xl italic">
            <span className="gold-shimmer">Konfirmasi Transfer</span>
          </h3>
          <div className="ornament-line mx-auto mt-4 w-24" />
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="conf-name" className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400">
              Nama Pengirim
            </label>
            <input
              id="conf-name"
              type="text"
              name="name"
              placeholder="Nama Anda"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-sm border border-gold-500/30 bg-charcoal-950/60 px-4 py-3 font-body text-sm text-white/70 placeholder:text-white/20 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-500/40"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-xs text-red-400">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="conf-amount" className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400">
              Jumlah Transfer (Rp)
            </label>
            <input
              id="conf-amount"
              type="text"
              name="amount"
              inputMode="numeric"
              placeholder="Contoh: 500.000"
              value={formatAmount(formik.values.amount)}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                formik.setFieldValue("amount", digits);
              }}
              onBlur={formik.handleBlur}
              className="w-full rounded-sm border border-gold-500/30 bg-charcoal-950/60 px-4 py-3 font-body text-sm text-white/70 placeholder:text-white/20 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-500/40"
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="mt-1 text-xs text-red-400">{formik.errors.amount}</p>
            )}
          </div>

          <div>
            <label htmlFor="conf-proof" className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400">
              Bukti Transfer
            </label>
            <label
              htmlFor="conf-proof"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-gold-500/40 bg-charcoal-950/40 px-4 py-6 transition hover:border-gold-400"
            >
              <Upload className="h-5 w-5 text-gold-400/70" />
              <span className="font-body text-xs text-white/40">
                {formik.values.proofFile
                  ? formik.values.proofFile.name
                  : "Klik untuk upload foto bukti transfer"}
              </span>
              <input
                id="conf-proof"
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  formik.setFieldValue("proofFile", file);
                }}
              />
            </label>
            {formik.touched.proofFile && formik.errors.proofFile && (
              <p className="mt-1 text-xs text-red-400">{formik.errors.proofFile as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="conf-message" className="mb-2 block font-body text-xs uppercase tracking-[0.3em] text-gold-400">
              Pesan <span className="normal-case tracking-normal text-white/30">(opsional)</span>
            </label>
            <textarea
              id="conf-message"
              name="message"
              rows={3}
              placeholder="Tulis pesan singkat..."
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full resize-none rounded-sm border border-gold-500/30 bg-charcoal-950/60 px-4 py-3 font-body text-sm text-white/70 placeholder:text-white/20 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-500/40"
            />
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
        </form>
      </div>
    </div>
  );
};

export default GiftConfirmationModal;
