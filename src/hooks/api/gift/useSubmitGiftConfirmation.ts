"use client";

import { GiftConfirmationFormValues } from "@/types/gift";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";
const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_GIFT_SCRIPT_URL ?? "";

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData },
  );

  if (!res.ok) throw new Error("Gagal mengupload bukti transfer");

  const data = await res.json();
  return data.secure_url as string;
};

const useSubmitGiftConfirmation = () => {
  return useMutation({
    mutationFn: async (payload: GiftConfirmationFormValues) => {
      if (!CLOUD_NAME || !UPLOAD_PRESET) throw new Error("Cloudinary belum dikonfigurasi");
      if (!SCRIPT_URL) throw new Error("Google Script URL belum dikonfigurasi");

      const proofUrl = await uploadToCloudinary(payload.proofFile!);

      const body = new URLSearchParams({
        name: payload.name,
        amount: payload.amount,
        message: payload.message,
        proofUrl,
        createdAt: new Date().toISOString(),
      });

      const res = await fetch(SCRIPT_URL, { method: "POST", body });
      if (!res.ok) throw new Error("Gagal mengirim konfirmasi");
    },
    onSuccess: () => {
      toast.success("Konfirmasi transfer berhasil dikirim!");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Gagal mengirim konfirmasi");
    },
  });
};

export default useSubmitGiftConfirmation;
