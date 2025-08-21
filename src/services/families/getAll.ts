import { api } from "~/lib/axios";
import type { Family } from "~/types/family";

export const getAllFamilies = async (): Promise<Family[]> => {
  const { data } = await api.get("/families");
  return data;
};
