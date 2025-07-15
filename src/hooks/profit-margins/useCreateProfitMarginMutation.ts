import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { profitMarginService } from "~/services/profit-margins";
import type { CreateProfitMarginData, ProfitMargin } from "~/types/profit-margin";
import { PROFIT_MARGINS_QUERY_KEY } from './useProfitMargins';

export function useCreateProfitMarginMutation() {
    const { mutateAsync: createProfitMargin, isPending } = useMutation({
        mutationFn: (data: CreateProfitMarginData) => profitMarginService.create(data),
        onMutate: (variables) => {
            const tempProfitMarginId = Math.random().toString();

            const previousProfitMargins = queryClient.getQueryData<ProfitMargin[]>(PROFIT_MARGINS_QUERY_KEY)

            queryClient.setQueryData(PROFIT_MARGINS_QUERY_KEY, (old: ProfitMargin[]) => [...old, {
                ...variables,
                id: tempProfitMarginId,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }])

            return { previousProfitMargins, tempProfitMarginId }
        },
        onSuccess: (data, _variables, context) => {
            queryClient.setQueryData(PROFIT_MARGINS_QUERY_KEY, (old: ProfitMargin[]) =>
                old.map(profitMargin => profitMargin.id === context?.tempProfitMarginId ? data : profitMargin)
            )
            toast.success('Margem de lucro criada com sucesso')
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(PROFIT_MARGINS_QUERY_KEY, context?.previousProfitMargins)
            toast.error('Erro ao criar margem de lucro')
        }
    })

    return { createProfitMargin, isPending }
} 