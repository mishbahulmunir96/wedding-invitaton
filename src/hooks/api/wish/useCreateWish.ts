"use client";

import { supabase } from "@/lib/supabase";
import { Wish, WishFormValues } from "@/types/wish";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: WishFormValues): Promise<Wish> => {
      const { data, error } = await supabase
        .from("wishes")
        .insert({ name: payload.name, message: payload.message })
        .select()
        .single();

      if (error) throw new Error(error.message);

      return data as Wish;
    },
    onSuccess: () => {
      toast.success("Terima kasih atas ucapan dan doanya!");
      queryClient.invalidateQueries({ queryKey: ["wish-list"] });
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Gagal mengirim ucapan");
    },
  });
};

export default useCreateWish;
