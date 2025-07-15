import { useQuery } from '@tanstack/react-query'
import { boletoService } from '~/services/boletos'
import type { Boleto } from '~/types/boleto'
import { BOLETOS_QUERY_KEY } from './useCreateBoletoMutation'

export const useGetBoleto = (id: string) => {
    const {
        data: boleto,
        isLoading,
        error,
    } = useQuery({
        queryKey: [...BOLETOS_QUERY_KEY, id],
        queryFn: async (): Promise<Boleto> => {
            const response = await boletoService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return {
        boleto,
        isLoading,
        error,
    }
} 