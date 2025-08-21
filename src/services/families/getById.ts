import { api } from "~/lib/axios";
import type { Family } from "~/types/family";

export const getFamilyById = async (id: string): Promise<Family> => {
  const { data } = await api.get(`/families/${id}`);
  return data;
};
