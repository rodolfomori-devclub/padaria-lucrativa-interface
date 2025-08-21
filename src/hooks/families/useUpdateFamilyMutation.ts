import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { familyService } from "~/services/families";
import type { Family, UpdateFamilyData } from "~/types/family";
import { FAMILIES_QUERY_KEY } from "./useFamilies";

interface UpdateFamilyVariables {
  id: string;
  data: UpdateFamilyData;
}

export function useUpdateFamilyMutation() {
  const { mutateAsync: updateFamily, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateFamilyVariables) => {
      return await familyService.update(id, data);
    },
    onMutate: async (variables) => {
      const previousFamilies =
        queryClient.getQueryData<Family[]>(FAMILIES_QUERY_KEY);

      if (previousFamilies) {
        queryClient.setQueryData(
          FAMILIES_QUERY_KEY,
          previousFamilies.map((family) =>
            family.id === variables.id
              ? { ...family, ...variables.data, updatedAt: new Date() }
              : family
          )
        );
      }

      return { previousFamilies };
    },
    onSuccess: (data, variables) => {
      const previousFamilies =
        queryClient.getQueryData<Family[]>(FAMILIES_QUERY_KEY);

      if (previousFamilies) {
        queryClient.setQueryData(
          FAMILIES_QUERY_KEY,
          previousFamilies.map((family) =>
            family.id === variables.id ? data : family
          )
        );
      }

      // Also update individual family query if it exists
      queryClient.setQueryData(["family", variables.id], data);

      toast.success("Família atualizada com sucesso");
    },
    onError: (error: AxiosError, _variables, context) => {
      if (context?.previousFamilies) {
        queryClient.setQueryData(FAMILIES_QUERY_KEY, context.previousFamilies);
      }
      toast.error(
        (error.response?.data as { message: string }).message ||
          "Erro ao atualizar família"
      );
    },
  });

  return { updateFamily, isPending };
}
