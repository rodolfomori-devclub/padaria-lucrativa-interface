import { useQuery } from '@tanstack/react-query'
import { boletoService } from '~/services/boletos'
import type { BoletoFilters, PaginatedBoletoResponse } from '~/types/boleto'
import { BOLETOS_QUERY_KEY } from './useCreateBoletoMutation'

export const useBoletos = (filters?: BoletoFilters) => {
    const queryKey = filters
        ? [BOLETOS_QUERY_KEY[0], filters]
        : BOLETOS_QUERY_KEY

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<PaginatedBoletoResponse> => {
            return await boletoService.getAll(filters)
        },
    })

    const boletos = data?.data ?? []
    const total = boletos.reduce((acc, boleto) => acc + boleto.value, 0) || null

    return {
        boletos,
        meta: data?.meta,
        isLoading,
        error,
        total,
    }
} 