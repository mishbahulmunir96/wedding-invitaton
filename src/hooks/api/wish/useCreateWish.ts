"use client";

import { Wish, WishFormValues } from "@/types/wish";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const STORAGE_KEY = "wedding_wish_list";

const useCreateWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: WishFormValues): Promise<Wish> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (typeof window === "undefined") {
        throw new Error("Storage tidak tersedia");
      }

      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: Wish[] = raw ? JSON.parse(raw) : [];

      const newWish: Wish = {
        id: Date.now(),
        name: payload.name,
        message: payload.message,
        createdAt: new Date().toISOString(),
      };

      list.unshift(newWish);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

      return newWish;
    },
    onSuccess: () => {
      toast.success("Terima kasih atas ucapan dan doanya!");
      queryClient.invalidateQueries({ queryKey: ["wish-list"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message ?? "Gagal mengirim ucapan");
    },
  });
};

export default useCreateWish;
