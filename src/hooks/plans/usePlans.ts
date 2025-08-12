import { useQuery } from '@tanstack/react-query'
import { getAllPlans } from '~/services/plans'

export const PLANS_QUERY_KEY = ['plans']

export const usePlans = () => {
    return useQuery({
        queryKey: PLANS_QUERY_KEY,
        queryFn: getAllPlans,
    })
}
