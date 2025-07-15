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
            const previousBoletos = queryClient.getQueryData<Boleto[]>(BOLETOS_QUERY_KEY);
            const previousBoleto = queryClient.getQueryData<Boleto>([BOLETOS_QUERY_KEY, variables]);

            // Optimistically update expenses list
            if (previousBoletos) {
                queryClient.setQueryData<Boleto[]>(BOLETOS_QUERY_KEY, (old) =>
                    old?.map(boleto =>
                        boleto.id === variables
                            ? { ...boleto, paid: true, updatedAt: new Date() }
                            : boleto
                    ) ?? []
                );
            }

            // Optimistically update single expense if it exists in cache
            if (previousBoleto) {
                queryClient.setQueryData<Boleto>([BOLETOS_QUERY_KEY, variables], {
                    ...previousBoleto,
                    paid: true,
                    updatedAt: new Date()
                });
            }

            return { previousBoletos, previousBoleto };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BOLETOS_QUERY_KEY })
            toast.success('Boleto pago com sucesso')
        },
        onError: (_error, _variables, context) => {
            // Rollback to the previous state
            queryClient.setQueryData(BOLETOS_QUERY_KEY, context?.previousBoletos)
            queryClient.setQueryData([BOLETOS_QUERY_KEY, _variables], context?.previousBoleto)
            toast.error('Erro ao pagar boleto')
        },
    })
}