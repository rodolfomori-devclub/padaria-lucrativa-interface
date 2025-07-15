import { api } from "~/lib/axios";
import type { CreateSaleData } from "~/types/sales-projection";

export const createSale = async (data: CreateSaleData) => {
  const response = await api.post("/sales", data);
  return response.data;
};
