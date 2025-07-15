import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useLossControlFilters } from '~/hooks/filters/loss-control-filters'
import { queryClient } from '~/lib/queryClient'
import { lossControlService } from '~/services/loss-control'
import type { LossControl, UpdateLossControlData } from '~/types/loss-control'
import { LOSS_CONTROL_QUERY_KEY } from './useCreateLossControlMutation'

interface UpdateLossControlVariables {
    id: string;
    data: Omit<UpdateLossControlData, 'totalValue'>;
}

export const useUpdateLossControlMutation = () => {
    const { filters } = useLossControlFilters();
    const queryKey = [LOSS_CONTROL_QUERY_KEY[0], filters]

    const mutation = useMutation({
        mutationFn: async ({ id, data }: UpdateLossControlVariables) => {
            return await lossControlService.update(id, data);
        },
        onMutate: async (variables) => {
            const previousLossControls = queryClient.getQueryData<LossControl[]>(queryKey);
            const previousLossControl = queryClient.getQueryData<LossControl>([...LOSS_CONTROL_QUERY_KEY, variables.id]);

            // Optimistically update loss controls list
            if (previousLossControls) {
                queryClient.setQueryData<LossControl[]>(queryKey, (old) =>
                    old?.map(lossControl =>
                        lossControl.id === variables.id
                            ? { ...lossControl, ...variables.data }
                            : lossControl
                    ) ?? []
                );
            }

            // Optimistically update single loss control if it exists in cache
            if (previousLossControl) {
                queryClient.setQueryData<LossControl>([...LOSS_CONTROL_QUERY_KEY, variables.id], {
                    ...previousLossControl,
                    ...variables.data,
                });
            }

            return { previousLossControls, previousLossControl };
        },
        onSuccess: (data, variables) => {
            // Update both the list and individual loss control cache with real data
            queryClient.setQueryData<LossControl[]>(queryKey, (old) =>
                old?.map(lossControl => lossControl.id === variables.id ? data : lossControl) ?? []
            );

            queryClient.setQueryData<LossControl>([...LOSS_CONTROL_QUERY_KEY, variables.id], data);

            // Invalidate all loss control queries to ensure consistency
            queryClient.invalidateQueries({ queryKey: [LOSS_CONTROL_QUERY_KEY[0]] });

            toast.success('Perda atualizada com sucesso!');
        },
        onError: (_error, variables, context) => {
            // Rollback optimistic updates
            if (context?.previousLossControls) {
                queryClient.setQueryData(queryKey, context.previousLossControls);
            }
            if (context?.previousLossControl) {
                queryClient.setQueryData([...LOSS_CONTROL_QUERY_KEY, variables.id], context.previousLossControl);
            }

            toast.error('Erro ao atualizar perda');
        }
    })

    return {
        updateLossControl: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 