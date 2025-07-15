import { useQuery } from '@tanstack/react-query'
import { boletoService } from '~/services/boletos'
import type { Boleto, BoletoFilters } from '~/types/boleto'
import { BOLETOS_QUERY_KEY } from './useCreateBoletoMutation'

export const useBoletos = (filters?: BoletoFilters) => {
    const queryKey = filters
        ? [BOLETOS_QUERY_KEY[0], filters]
        : BOLETOS_QUERY_KEY

    const {
        data: boletos = [],
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<Boleto[]> => {
            const response = await boletoService.getAll(filters)
            return response
        },
    })

    return {
        boletos,
        isLoading,
        error,
    }
} 