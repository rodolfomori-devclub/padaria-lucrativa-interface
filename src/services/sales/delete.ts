import { api } from "~/lib/axios";

export const deleteSale = async (id: string) => {
  const { data } = await api.delete(`/sales/${id}`);
  return data;
};
