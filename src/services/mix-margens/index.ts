import { api } from "~/lib/axios";
import type { MixMargensData, MixMargensFilters } from "~/types/mix-margens";

export const getMixMargensData = async (
  filters?: MixMargensFilters
): Promise<MixMargensData> => {
  const params = new URLSearchParams();

  if (filters) {
    if (filters.month) params.append("month", filters.month.toString());
    if (filters.year) params.append("year", filters.year.toString());
  }

  const { data } = await api.get(`/mix-margens?${params.toString()}`);
  return data;
};

export const mixMargensService = {
  getData: getMixMargensData,
};
