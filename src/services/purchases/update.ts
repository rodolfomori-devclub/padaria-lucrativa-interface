import { api } from "~/lib/axios";
import type { UpdatePurchaseData } from "~/types/sales-projection";

export const updatePurchase = async (id: string, data: UpdatePurchaseData) => {
  const response = await api.put(`/purchases/${id}`, data);
  return response.data;
};
