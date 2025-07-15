import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { boletoService } from '~/services/boletos'
import type { CreateBoletoData } from '~/types/boleto'

export const BOLETOS_QUERY_KEY = ['boletos']

export const useCreateBoletoMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: CreateBoletoData) => boletoService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BOLETOS_QUERY_KEY })
            toast.success('Boleto criado com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao criar boleto')
        }
    })

    return {
        createBoleto: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 