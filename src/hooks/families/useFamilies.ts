import { useQuery } from "@tanstack/react-query";
import { familyService } from "~/services/families";
import type { Family } from "~/types/family";

export const FAMILIES_QUERY_KEY = ["families"];

export const useFamilies = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: FAMILIES_QUERY_KEY,
    queryFn: async (): Promise<Family[]> => {
      const response = await familyService.getAll();
      return response;
    },
  });

  return {
    families: data || [],
    isLoading,
    error,
  };
};
