import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { purchaseService } from "~/services/purchases";
import type { CreatePurchaseData, Purchase } from "~/types/sales-projection";
import { PURCHASES_QUERY_KEY } from "./usePurchases";

export function useCreatePurchaseMutation() {
  const { mutateAsync: createPurchase, isPending } = useMutation({
    mutationFn: (data: CreatePurchaseData) => purchaseService.create(data),
    onMutate: (variables) => {
      const tempPurchaseId = Math.random().toString();

      const previousPurchases =
        queryClient.getQueryData<Purchase[]>(PURCHASES_QUERY_KEY);

      queryClient.setQueryData(PURCHASES_QUERY_KEY, (old: Purchase[] = []) => [
        ...old,
        {
          ...variables,
          id: tempPurchaseId,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Purchase,
      ]);

      return { previousPurchases, tempPurchaseId };
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData(PURCHASES_QUERY_KEY, (old: Purchase[] = []) =>
        old.map((purchase) =>
          purchase.id === context?.tempPurchaseId ? data : purchase
        )
      );
      toast.success("Compra criada com sucesso");
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(PURCHASES_QUERY_KEY, context?.previousPurchases);
      toast.error("Erro ao criar compra");
    },
  });

  return { createPurchase, isPending };
}
