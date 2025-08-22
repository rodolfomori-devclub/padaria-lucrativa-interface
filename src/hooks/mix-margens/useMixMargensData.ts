import { useQuery } from "@tanstack/react-query";
import { mixMargensService } from "~/services/mix-margens";
import type { MixMargensData, MixMargensFilters } from "~/types/mix-margens";

export const MIX_MARGENS_QUERY_KEY = ["mix-margens"];

export const useMixMargensData = (filters?: MixMargensFilters) => {
  const queryKey = filters
    ? [MIX_MARGENS_QUERY_KEY[0], filters]
    : MIX_MARGENS_QUERY_KEY;

  const {
    data: mixMargensData,
    isLoading,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    staleTime: 0,
    queryKey,
    queryFn: async (): Promise<MixMargensData> => {
      const response = await mixMargensService.getData(filters);
      return response;
    },
    retry: (failureCount, error: unknown) => {
      // Don't retry on authentication errors
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response?.status === 401) return false;
      }
      return failureCount < 3;
    },
  });

  return {
    mixMargensData,
    isLoading,
    error,
    refetch,
    dataUpdatedAt,
  };
};
