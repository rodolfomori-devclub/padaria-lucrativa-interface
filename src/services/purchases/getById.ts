import { api } from "~/lib/axios";

export const getPurchaseById = async (id: string) => {
  const { data } = await api.get(`/purchases/${id}`);
  return data;
};
