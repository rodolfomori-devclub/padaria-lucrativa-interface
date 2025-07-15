import { useQuery } from '@tanstack/react-query';
import { profitMarginService } from '~/services/profit-margins';
import type { ProfitMargin } from '~/types/profit-margin';

export const PROFIT_MARGINS_QUERY_KEY = ['profit-margins'];

export const useProfitMargins = () => {
    const {
        data: profitMargins = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: PROFIT_MARGINS_QUERY_KEY,
        queryFn: async (): Promise<ProfitMargin[]> => {
            const response = await profitMarginService.getAll()
            return response
        },
    })

    return {
        profitMargins,
        isLoading,
        error,
    }
} 