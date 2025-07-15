import { api } from "~/lib/axios";
import type { CreatePurchaseData } from "~/types/sales-projection";

export const createPurchase = async (data: CreatePurchaseData) => {
  const response = await api.post("/purchases", data);
  return response.data;
};
