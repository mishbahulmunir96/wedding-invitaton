"use client";

import { supabase } from "@/lib/supabase";
import { Wish } from "@/types/wish";
import { useQuery } from "@tanstack/react-query";

const useGetWishes = () => {
  return useQuery({
    queryKey: ["wish-list"],
    queryFn: async (): Promise<Wish[]> => {
      const { data, error } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      return (data ?? []).map((row: any) => ({
        id: row.id,
        name: row.name,
        message: row.message,
        createdAt: row.created_at,
      })) as Wish[];
    },
  });
};

export default useGetWishes;
