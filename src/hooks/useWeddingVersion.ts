"use client";

import { weddingDataPutri, weddingDataPutra } from "@/features/home/constants";
import { Person } from "@/types/wedding";
import { useQueryState } from "nuqs";

export const useWeddingVersion = () => {
  const [version] = useQueryState("v");

  const data = version === "putra" ? weddingDataPutra : weddingDataPutri;

  const first: Person = data.displayOrder === "groom-first" ? data.groom : data.bride;
  const second: Person = data.displayOrder === "groom-first" ? data.bride : data.groom;

  return { data, first, second };
};
