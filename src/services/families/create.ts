import { api } from "~/lib/axios";
import type { CreateFamilyData, Family } from "~/types/family";

export const createFamily = async (data: CreateFamilyData): Promise<Family> => {
  const response = await api.post("/families", data);
  return response.data;
};
