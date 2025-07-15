import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { profitMarginService } from "~/services/profit-margins";
import type { ProfitMargin } from "~/types/profit-margin";
import { PROFIT_MARGINS_QUERY_KEY } from "./useProfitMargins";

export function useDeleteProfitMarginMutation() {
    const { mutateAsync: deleteProfitMargin, isPending } = useMutation({
        mutationFn: (id: string) => profitMarginService.delete(id),
        onMutate: (id) => {
            const previousProfitMargins = queryClient.getQueryData<ProfitMargin[]>(PROFIT_MARGINS_QUERY_KEY)

            queryClient.setQueryData(PROFIT_MARGINS_QUERY_KEY, (old: ProfitMargin[]) =>
                old.filter(profitMargin => profitMargin.id !== id)
            )

            return { previousProfitMargins }
        },
        onSuccess: () => {
            toast.success('Margem de lucro excluída com sucesso')
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(PROFIT_MARGINS_QUERY_KEY, context?.previousProfitMargins)
            toast.error('Erro ao excluir margem de lucro')
        }
    })

    return { deleteProfitMargin, isPending }
} 