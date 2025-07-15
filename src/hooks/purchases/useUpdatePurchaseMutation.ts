import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { purchaseService } from "~/services/purchases";
import type { Purchase, UpdatePurchaseData } from "~/types/sales-projection";
import { PURCHASES_QUERY_KEY } from "./usePurchases";

interface UpdatePurchaseVariables {
  id: string;
  data: UpdatePurchaseData;
}

export function useUpdatePurchaseMutation() {
  const { mutateAsync: updatePurchase, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdatePurchaseVariables) => {
      return await purchaseService.update(id, data);
    },
    onMutate: async (variables) => {
      const previousPurchases =
        queryClient.getQueryData<Purchase[]>(PURCHASES_QUERY_KEY);

      // Optimistically update purchases list
      if (previousPurchases) {
        queryClient.setQueryData<Purchase[]>(PURCHASES_QUERY_KEY, (old = []) =>
          old.map((purchase) =>
            purchase.id === variables.id
              ? { ...purchase, ...variables.data, updatedAt: new Date() }
              : purchase
          )
        );
      }

      return { previousPurchases };
    },
    onSuccess: (data, variables) => {
      // Update with real data from server
      queryClient.setQueryData<Purchase[]>(PURCHASES_QUERY_KEY, (old = []) =>
        old.map((purchase) => (purchase.id === variables.id ? data : purchase))
      );

      toast.success("Compra atualizada com sucesso");
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(PURCHASES_QUERY_KEY, context?.previousPurchases);
      toast.error("Erro ao atualizar compra");
    },
  });

  return { updatePurchase, isPending };
}
