import { api } from "~/lib/axios";

export const getSaleById = async (id: string) => {
  const { data } = await api.get(`/sales/${id}`);
  return data;
};
