import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createPlan } from '~/services/plans'
import type { CreatePlanData, Plan } from '~/types/plan'
import { PLANS_QUERY_KEY } from './usePlans'

export function useCreatePlanMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createPlan,
        onMutate: async (newPlanData: CreatePlanData) => {
            await queryClient.cancelQueries({ queryKey: PLANS_QUERY_KEY })
            const previousPlans = queryClient.getQueryData<Plan[]>(PLANS_QUERY_KEY)

            queryClient.setQueryData(PLANS_QUERY_KEY, (old: Plan[]) => [...old, {
                id: 'temp-id',
                ...newPlanData,
                isActive: true,
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                usersCount: 0,
            }])

            return { previousPlans }
        },
        onSuccess: (data: Plan) => {
            queryClient.setQueryData(PLANS_QUERY_KEY, (old: Plan[]) =>
                old.map(plan => plan.id === 'temp-id' ? data : plan)
            )
            toast.success('Plano criado com sucesso!')
        },
        onError: (_error, _newPlanData, context) => {
            queryClient.setQueryData(PLANS_QUERY_KEY, context?.previousPlans)
            toast.error('Erro ao criar plano')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY })
        },
    })
}
