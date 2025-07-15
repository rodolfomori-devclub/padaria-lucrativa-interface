import { useQuery } from "@tanstack/react-query";
import { saleService } from "~/services/sales";
import type { Sale, SalesProjectionFilters } from "~/types/sales-projection";

export const SALES_QUERY_KEY = ["sales"];

export const useSales = (filters?: SalesProjectionFilters) => {
  const queryKey = filters ? [SALES_QUERY_KEY[0], filters] : SALES_QUERY_KEY;

  const {
    data: sales = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: async (): Promise<Sale[]> => {
      const response = await saleService.getAll(filters);
      return response;
    },
  });

  return {
    sales,
    isLoading,
    error,
  };
};
