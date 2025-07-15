import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { profitMarginService } from "~/services/profit-margins";
import type { ProfitMargin, UpdateProfitMarginData } from "~/types/profit-margin";
import { PROFIT_MARGINS_QUERY_KEY } from "./useProfitMargins";

export function useUpdateProfitMarginMutation() {
    const { mutateAsync: updateProfitMargin, isPending } = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProfitMarginData }) =>
            profitMarginService.update(id, data),
        onMutate: ({ id, data }) => {
            const previousProfitMargins = queryClient.getQueryData<ProfitMargin[]>(PROFIT_MARGINS_QUERY_KEY)

            queryClient.setQueryData(PROFIT_MARGINS_QUERY_KEY, (old: ProfitMargin[]) =>
                old.map(profitMargin =>
                    profitMargin.id === id
                        ? { ...profitMargin, ...data, updatedAt: new Date() }
                        : profitMargin
                )
            )

            return { previousProfitMargins }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(PROFIT_MARGINS_QUERY_KEY, (old: ProfitMargin[]) =>
                old.map(profitMargin => profitMargin.id === data.id ? data : profitMargin)
            )
            toast.success('Margem de lucro atualizada com sucesso')
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(PROFIT_MARGINS_QUERY_KEY, context?.previousProfitMargins)
            toast.error('Erro ao atualizar margem de lucro')
        }
    })

    return { updateProfitMargin, isPending }
} 