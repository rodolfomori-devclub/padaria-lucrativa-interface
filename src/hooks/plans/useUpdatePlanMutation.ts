import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updatePlan } from '~/services/plans'
import type { Plan, UpdatePlanData } from '~/types/plan'
import { PLANS_QUERY_KEY } from './usePlans'

interface UpdatePlanVariables {
    id: string
    data: UpdatePlanData
}

export function useUpdatePlanMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: UpdatePlanVariables) => updatePlan(id, data),
        onMutate: async ({ id, data }: UpdatePlanVariables) => {
            await queryClient.cancelQueries({ queryKey: PLANS_QUERY_KEY })
            const previousPlans = queryClient.getQueryData<Plan[]>(PLANS_QUERY_KEY)

            queryClient.setQueryData(PLANS_QUERY_KEY, (old: Plan[]) =>
                old.map(plan => plan.id === id ? { ...plan, ...data } : plan)
            )

            return { previousPlans }
        },
        onSuccess: (data: Plan) => {
            queryClient.setQueryData(PLANS_QUERY_KEY, (old: Plan[]) =>
                old.map(plan => plan.id === data.id ? data : plan)
            )
            toast.success('Plano atualizado com sucesso!')
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(PLANS_QUERY_KEY, context?.previousPlans)
            toast.error('Erro ao atualizar plano')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY })
        },
    })
}
