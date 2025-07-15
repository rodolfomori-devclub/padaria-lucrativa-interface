import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { boletoService } from '~/services/boletos'
import type { UpdateBoletoData } from '~/types/boleto'
import { BOLETOS_QUERY_KEY } from './useCreateBoletoMutation'

export const useUpdateBoletoMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBoletoData }) =>
            boletoService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BOLETOS_QUERY_KEY })
            toast.success('Boleto atualizado com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao atualizar boleto')
        }
    })

    return {
        updateBoleto: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 