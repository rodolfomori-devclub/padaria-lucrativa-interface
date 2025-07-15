import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { saleService } from "~/services/sales";
import type { Sale, UpdateSaleData } from "~/types/sales-projection";
import { SALES_QUERY_KEY } from "./useSales";

interface UpdateSaleVariables {
  id: string;
  data: UpdateSaleData;
}

export function useUpdateSaleMutation() {
  const { mutateAsync: updateSale, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateSaleVariables) => {
      return await saleService.update(id, data);
    },
    onMutate: async (variables) => {
      const previousSales = queryClient.getQueryData<Sale[]>(SALES_QUERY_KEY);

      // Optimistically update sales list
      if (previousSales) {
        queryClient.setQueryData<Sale[]>(SALES_QUERY_KEY, (old = []) =>
          old.map((sale) =>
            sale.id === variables.id
              ? { ...sale, ...variables.data, updatedAt: new Date() }
              : sale
          )
        );
      }

      return { previousSales };
    },
    onSuccess: (data, variables) => {
      // Update with real data from server
      queryClient.setQueryData<Sale[]>(SALES_QUERY_KEY, (old = []) =>
        old.map((sale) => (sale.id === variables.id ? data : sale))
      );

      toast.success("Venda atualizada com sucesso");
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(SALES_QUERY_KEY, context?.previousSales);
      toast.error("Erro ao atualizar venda");
    },
  });

  return { updateSale, isPending };
}
