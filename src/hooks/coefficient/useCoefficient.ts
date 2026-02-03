import { useQuery } from "@tanstack/react-query";
import {
  coefficientService,
  type CoefficientResponse,
} from "~/services/coefficient";

export const COEFFICIENT_QUERY_KEY = ["coefficient"];

export const useCoefficient = () => {
  const {
    data: coefficientData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: COEFFICIENT_QUERY_KEY,
    queryFn: async (): Promise<CoefficientResponse> => {
      const response = await coefficientService.get();
      return response;
    },
    // Coefficient is based on last month's data, so it's relatively stable
    staleTime: 1000 * 60 * 60, // 1 hour
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
    coefficient: coefficientData?.coefficient,
    isLoading,
    error,
    refetch,
  };
};
