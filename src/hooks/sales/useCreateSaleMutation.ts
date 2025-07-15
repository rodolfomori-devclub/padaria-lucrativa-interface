import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { saleService } from "~/services/sales";
import type { CreateSaleData, Sale } from "~/types/sales-projection";
import { SALES_QUERY_KEY } from "./useSales";

export function useCreateSaleMutation() {
  const { mutateAsync: createSale, isPending } = useMutation({
    mutationFn: (data: CreateSaleData) => saleService.create(data),
    onMutate: (variables) => {
      const tempSaleId = Math.random().toString();

      const previousSales = queryClient.getQueryData<Sale[]>(SALES_QUERY_KEY);

      queryClient.setQueryData(SALES_QUERY_KEY, (old: Sale[] = []) => [
        ...old,
        {
          ...variables,
          id: tempSaleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Sale,
      ]);

      return { previousSales, tempSaleId };
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData(SALES_QUERY_KEY, (old: Sale[] = []) =>
        old.map((sale) => (sale.id === context?.tempSaleId ? data : sale))
      );
      toast.success("Venda criada com sucesso");
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(SALES_QUERY_KEY, context?.previousSales);
      toast.error("Erro ao criar venda");
    },
  });

  return { createSale, isPending };
}
