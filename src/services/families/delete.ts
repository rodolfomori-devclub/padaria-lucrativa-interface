import { api } from "~/lib/axios";

export const deleteFamily = async (id: string): Promise<void> => {
  await api.delete(`/families/${id}`);
};
