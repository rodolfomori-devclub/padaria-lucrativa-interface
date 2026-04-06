import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { queryClient } from "~/lib/queryClient"
import { boletoService } from "~/services/boletos"
import type { Boleto } from "~/types/boleto"
import { BOLETOS_QUERY_KEY } from "./useCreateBoletoMutation"

export const usePayBoleto = () => {

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await boletoService.pay(id)
            return response
        },
        onMutate: async (variables) => {
            const detailKey = [...BOLETOS_QUERY_KEY, variables] as const
            const previousBoleto = queryClient.getQueryData<Boleto>(detailKey)

            if (previousBoleto) {
                queryClient.setQueryData<Boleto>(detailKey, {
                    ...previousBoleto,
                    paid: true,
                    updatedAt: new Date()
                })
            }

            return { previousBoleto, detailKey }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BOLETOS_QUERY_KEY })
            toast.success('Boleto pago com sucesso')
        },
        onError: (_error, _variables, context) => {
            if (context?.detailKey) {
                queryClient.setQueryData(context.detailKey, context.previousBoleto)
            }
            toast.error('Erro ao pagar boleto')
        },
    })
}
