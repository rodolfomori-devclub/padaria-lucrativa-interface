import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { familyService } from "~/services/families";
import type { CreateFamilyData, Family } from "~/types/family";
import { FAMILIES_QUERY_KEY } from "./useFamilies";

export function useCreateFamilyMutation() {
  const { mutateAsync: createFamily, isPending } = useMutation({
    mutationFn: (data: CreateFamilyData) => familyService.create(data),
    onMutate: (variables) => {
      const tempFamilyId = Math.random().toString();

      const previousFamilies =
        queryClient.getQueryData<Family[]>(FAMILIES_QUERY_KEY);

      queryClient.setQueryData(FAMILIES_QUERY_KEY, (old: Family[]) => [
        {
          ...variables,
          id: tempFamilyId,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...old,
      ]);

      return { previousFamilies, tempFamilyId };
    },
    onSuccess: (data, _variables, context) => {
      const previousFamilies =
        queryClient.getQueryData<Family[]>(FAMILIES_QUERY_KEY);

      if (previousFamilies) {
        queryClient.setQueryData(FAMILIES_QUERY_KEY, (old: Family[]) =>
          old.map((family) =>
            family.id === context?.tempFamilyId ? data : family
          )
        );
      }

      toast.success("Família criada com sucesso");
    },
    onError: (error: AxiosError, _variables, context) => {
      if (context?.previousFamilies) {
        queryClient.setQueryData(FAMILIES_QUERY_KEY, context.previousFamilies);
      }
      toast.error(
        (error.response?.data as { message: string }).message ||
          "Erro ao criar família"
      );
    },
  });

  return { createFamily, isPending };
}
