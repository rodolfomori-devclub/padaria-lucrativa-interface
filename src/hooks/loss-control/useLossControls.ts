import { useQuery } from '@tanstack/react-query'
import { lossControlService } from '~/services/loss-control'
import type { LossControl, LossControlFilters } from '~/types/loss-control'
import { LOSS_CONTROL_QUERY_KEY } from './useCreateLossControlMutation'

export const useLossControls = (filters?: LossControlFilters) => {
    const queryKey = filters
        ? [LOSS_CONTROL_QUERY_KEY[0], filters]
        : LOSS_CONTROL_QUERY_KEY

    const {
        data: lossControls = [],
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<LossControl[]> => {
            const response = await lossControlService.getAll(filters)
            return response
        },
    })

    return {
        lossControls,
        isLoading,
        error,
    }
} 