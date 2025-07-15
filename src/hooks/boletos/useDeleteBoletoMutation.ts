import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { boletoService } from '~/services/boletos'
import { BOLETOS_QUERY_KEY } from './useCreateBoletoMutation'

export const useDeleteBoletoMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (id: string) => boletoService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BOLETOS_QUERY_KEY })
            toast.success('Boleto excluído com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao excluir boleto')
        }
    })

    return {
        deleteBoleto: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 