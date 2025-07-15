import { api } from "~/lib/axios";

export const deletePurchase = async (id: string) => {
  const { data } = await api.delete(`/purchases/${id}`);
  return data;
};
