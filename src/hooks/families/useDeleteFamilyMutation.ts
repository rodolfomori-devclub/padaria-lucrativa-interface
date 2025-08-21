import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { familyService } from "~/services/families";
import type { Family } from "~/types/family";
import { FAMILIES_QUERY_KEY } from "./useFamilies";

export function useDeleteFamilyMutation() {
  const { mutateAsync: deleteFamily, isPending } = useMutation({
    mutationFn: (id: string) => familyService.delete(id),
    onMutate: async (id) => {
      const previousFamilies =
        queryClient.getQueryData<Family[]>(FAMILIES_QUERY_KEY);

      if (previousFamilies) {
        queryClient.setQueryData(
          FAMILIES_QUERY_KEY,
          previousFamilies.filter((family) => family.id !== id)
        );
      }

      return { previousFamilies };
    },
    onSuccess: () => {
      toast.success("Família excluída com sucesso");
    },
    onError: (error: AxiosError, _variables, context) => {
      if (context?.previousFamilies) {
        queryClient.setQueryData(FAMILIES_QUERY_KEY, context.previousFamilies);
      }
      toast.error(
        (error.response?.data as { message: string }).message ||
          "Erro ao excluir família"
      );
    },
  });

  return { deleteFamily, isPending };
}
