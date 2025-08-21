import { api } from "~/lib/axios";
import type { Family, UpdateFamilyData } from "~/types/family";

export const updateFamily = async (
  id: string,
  data: UpdateFamilyData
): Promise<Family> => {
  const response = await api.put(`/families/${id}`, data);
  return response.data;
};
