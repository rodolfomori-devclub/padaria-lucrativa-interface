import { api } from "~/lib/axios";
import type { UpdateSaleData } from "~/types/sales-projection";

export const updateSale = async (id: string, data: UpdateSaleData) => {
  const response = await api.put(`/sales/${id}`, data);
  return response.data;
};
