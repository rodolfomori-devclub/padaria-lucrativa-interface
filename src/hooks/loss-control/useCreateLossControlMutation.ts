import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useLossControlFilters } from '~/hooks/filters/loss-control-filters'
import { queryClient } from '~/lib/queryClient'
import { lossControlService } from '~/services/loss-control'
import type { CreateLossControlData, LossControl } from '~/types/loss-control'

export const LOSS_CONTROL_QUERY_KEY = ['loss-control']

export const useCreateLossControlMutation = () => {
    const { filters } = useLossControlFilters();
    const queryKey = [LOSS_CONTROL_QUERY_KEY[0], filters]

    const mutation = useMutation({
        mutationFn: (data: Omit<CreateLossControlData, 'totalValue'>) => lossControlService.create(data),
        onMutate: (variables) => {
            const tempLossControlId = Math.random().toString();

            const previousLossControls = queryClient.getQueryData<LossControl[]>(queryKey);

            queryClient.setQueryData(queryKey, (old: LossControl[] = []) => [...old, {
                ...variables,
                id: tempLossControlId,
                createdAt: new Date(),
            } as LossControl]);

            return { previousLossControls, tempLossControlId };
        },
        onSuccess: (data, _variables, context) => {
            queryClient.setQueryData(queryKey, (old: LossControl[] = []) =>
                old.map(lossControl => lossControl.id === context?.tempLossControlId ? data : lossControl)
            );
            // Also invalidate queries to ensure all related caches are updated
            queryClient.invalidateQueries({ queryKey: [LOSS_CONTROL_QUERY_KEY[0]] });
            toast.success('Perda cadastrada com sucesso!');
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousLossControls);
            toast.error('Erro ao cadastrar perda');
        }
    })

    return {
        createLossControl: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 