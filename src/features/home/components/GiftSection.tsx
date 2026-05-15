"use client";

import { Check, Copy, Wallet } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { BankAccount, bankAccounts } from "../constants";

interface BankCardProps {
  account: BankAccount;
}

const BankCard: FC<BankCardProps> = ({ account }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      toast.success("Nomor rekening disalin");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin");
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-2 -top-2 h-7 w-7 border-l border-t border-gold-500/60" />
      <div className="pointer-events-none absolute -right-2 -top-2 h-7 w-7 border-r border-t border-gold-500/60" />
      <div className="pointer-events-none absolute -bottom-2 -left-2 h-7 w-7 border-b border-l border-gold-500/60" />
      <div className="pointer-events-none absolute -bottom-2 -right-2 h-7 w-7 border-b border-r border-gold-500/60" />

      <div className="relative rounded-sm border border-gold-500/30 bg-gradient-to-b from-charcoal-900/80 to-navy-900/40 p-6 backdrop-blur-sm md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/50 bg-charcoal-900">
            <Wallet className="h-4 w-4 text-gold-400" />
          </div>
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gold-300">
            {account.bank}
          </p>
        </div>

        <p className="mb-1 font-display text-3xl italic text-gold-100 md:text-4xl">
          <span className="gold-shimmer">{account.accountNumber}</span>
        </p>
        <p className="mb-5 font-body text-sm text-white/50">
          a.n. {account.accountHolder}
        </p>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-sm border border-gold-500/50 px-5 py-2 font-body text-xs uppercase tracking-[0.3em] text-gold-300 transition hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-200"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Salin Nomor</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const GiftSection: FC = () => {
  return (
    <section className="section-reveal relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.5em] text-gold-400/80">
            Wedding Gift
          </p>
          <h2 className="font-display text-4xl italic md:text-5xl">
            <span className="gold-shimmer">Amplop Digital</span>
          </h2>
          <div className="ornament-line mx-auto mt-6 w-40" />
          <p className="mx-auto mt-6 max-w-lg font-body text-sm leading-relaxed text-white/50 md:text-base">
            Doa restu dari Anda adalah hadiah terindah bagi kami. Namun jika
            ingin memberikan tanda kasih, dapat melalui rekening berikut.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {bankAccounts.map((account, idx) => (
            <BankCard key={idx} account={account} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
