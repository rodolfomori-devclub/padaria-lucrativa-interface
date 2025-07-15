import { useQuery } from '@tanstack/react-query'
import { lossControlService } from '~/services/loss-control'
import type { LossControl } from '~/types/loss-control'
import { LOSS_CONTROL_QUERY_KEY } from './useCreateLossControlMutation'

export const useGetLossControl = (id: string) => {
    const {
        data: lossControl,
        isLoading,
        error,
    } = useQuery({
        queryKey: [...LOSS_CONTROL_QUERY_KEY, id],
        queryFn: async (): Promise<LossControl> => {
            const response = await lossControlService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return {
        lossControl,
        isLoading,
        error,
    }
} 