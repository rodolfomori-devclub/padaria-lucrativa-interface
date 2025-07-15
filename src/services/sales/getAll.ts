import { api } from "~/lib/axios";
import type { SalesProjectionFilters } from "~/types/sales-projection";

export const getAllSales = async (filters?: SalesProjectionFilters) => {
  const params = new URLSearchParams();

  if (filters) {
    if (filters.month) params.append("month", filters.month.toString());
    if (filters.year) params.append("year", filters.year.toString());
    if (filters.fromDate)
      params.append("fromDate", filters.fromDate.toISOString());
    if (filters.toDate) params.append("toDate", filters.toDate.toISOString());
  }

  const { data } = await api.get(`/sales?${params.toString()}`);
  return data.data;
};
