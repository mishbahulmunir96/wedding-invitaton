"use client";

import { Wish } from "@/types/wish";
import { useQuery } from "@tanstack/react-query";

const STORAGE_KEY = "wedding_wish_list";

const useGetWishes = () => {
  return useQuery({
    queryKey: ["wish-list"],
    queryFn: async (): Promise<Wish[]> => {
      // Saat backend siap, ganti dengan:
      //   const { data } = await axiosInstance.get<Wish[]>("/wishes");
      //   return data;
      if (typeof window === "undefined") return [];
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Wish[]) : [];
    },
  });
};

export default useGetWishes;
