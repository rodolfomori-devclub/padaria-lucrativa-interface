import { useQuery } from '@tanstack/react-query'
import { profitMarginService } from '~/services/profit-margins'
import type { ProfitMargin } from '~/types/profit-margin'
import { PROFIT_MARGINS_QUERY_KEY } from './useProfitMargins'

export const useGetProfitMargin = (id?: string) => {
    const {
        data: profitMargin,
        isLoading,
        error,
    } = useQuery({
        queryKey: [...PROFIT_MARGINS_QUERY_KEY, id],
        queryFn: async (): Promise<ProfitMargin> => {
            if (!id) throw new Error('ID is required')
            return await profitMarginService.getById(id)
        },
        enabled: !!id,
    })

    return {
        profitMargin,
        isLoading,
        error,
    }
} 