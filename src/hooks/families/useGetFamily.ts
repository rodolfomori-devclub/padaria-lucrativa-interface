import { useQuery } from "@tanstack/react-query";
import { familyService } from "~/services/families";
import type { Family } from "~/types/family";

export const useGetFamily = (id: string) => {
  return useQuery({
    queryKey: ["family", id],
    queryFn: async (): Promise<Family> => {
      return await familyService.getById(id);
    },
    enabled: !!id,
  });
};
