import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { deletePlan } from '~/services/plans'
import type { Plan } from '~/types/plan'
import { PLANS_QUERY_KEY } from './usePlans'

export function useDeletePlanMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deletePlan,
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: PLANS_QUERY_KEY })
            const previousPlans = queryClient.getQueryData<Plan[]>(PLANS_QUERY_KEY)

            queryClient.setQueryData(PLANS_QUERY_KEY, (old: Plan[]) =>
                old.filter(plan => plan.id !== id)
            )

            return { previousPlans }
        },
        onSuccess: () => {
            toast.success('Plano excluído com sucesso!')
        },
        onError: (error: AxiosError, _id, context) => {
            queryClient.setQueryData(PLANS_QUERY_KEY, context?.previousPlans)

            if (error.response?.status === 400) {
                toast.error((error.response.data as { message: string }).message || 'Não é possível excluir o plano pois possui usuários vinculados')
            } else {
                toast.error('Erro ao excluir plano')
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY })
        },
    })
}
