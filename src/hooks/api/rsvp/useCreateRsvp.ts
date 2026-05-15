"use client";

import { Rsvp, RsvpFormValues } from "@/types/rsvp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ?? "";

const useCreateRsvp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RsvpFormValues): Promise<Rsvp> => {
      if (!SCRIPT_URL) {
        throw new Error("NEXT_PUBLIC_GOOGLE_SCRIPT_URL belum diset");
      }

      const body = new URLSearchParams({
        name: payload.name,
        attendance: payload.attendance,
        guestCount: String(payload.guestCount),
        createdAt: new Date().toISOString(),
      });

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body,
      });

      if (!res.ok) {
        throw new Error("Gagal mengirim ke Google Sheets");
      }

      const newRsvp: Rsvp = {
        id: Date.now(),
        name: payload.name,
        attendance: payload.attendance as Rsvp["attendance"],
        guestCount: Number(payload.guestCount),
        createdAt: new Date().toISOString(),
      };

      return newRsvp;
    },
    onSuccess: () => {
      toast.success("Terima kasih, konfirmasi kehadiran terkirim!");
      queryClient.invalidateQueries({ queryKey: ["rsvp-list"] });
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Gagal mengirim konfirmasi");
    },
  });
};

export default useCreateRsvp;
