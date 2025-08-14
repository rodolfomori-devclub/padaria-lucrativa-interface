import { useQuery } from '@tanstack/react-query'
import { getPlanById } from '~/services/plans'
import { PLANS_QUERY_KEY } from './usePlans'

export const useGetPlan = (id: string) => {
    return useQuery({
        queryKey: [...PLANS_QUERY_KEY, id],
        queryFn: () => getPlanById(id),
        enabled: !!id,
    })
}
