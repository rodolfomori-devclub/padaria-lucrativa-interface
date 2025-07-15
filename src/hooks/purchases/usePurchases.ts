import { useQuery } from "@tanstack/react-query";
import { purchaseService } from "~/services/purchases";
import type {
  Purchase,
  SalesProjectionFilters,
} from "~/types/sales-projection";

export const PURCHASES_QUERY_KEY = ["purchases"];

export const usePurchases = (filters?: SalesProjectionFilters) => {
  const queryKey = filters
    ? [PURCHASES_QUERY_KEY[0], filters]
    : PURCHASES_QUERY_KEY;

  const {
    data: purchases = [],
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: async (): Promise<Purchase[]> => {
      const response = await purchaseService.getAll(filters);
      return response;
    },
  });

  return {
    purchases,
    isLoading,
    error,
  };
};
