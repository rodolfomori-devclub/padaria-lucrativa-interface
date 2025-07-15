import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useLossControlFilters } from '~/hooks/filters/loss-control-filters'
import { queryClient } from '~/lib/queryClient'
import { lossControlService } from '~/services/loss-control'
import type { LossControl } from '~/types/loss-control'
import { LOSS_CONTROL_QUERY_KEY } from './useCreateLossControlMutation'

export const useDeleteLossControlMutation = () => {
    const { filters } = useLossControlFilters();
    const queryKey = [LOSS_CONTROL_QUERY_KEY[0], filters]

    const mutation = useMutation({
        mutationFn: (id: string) => lossControlService.delete(id),
        onMutate: (variables) => {
            const previousLossControls = queryClient.getQueryData<LossControl[]>(queryKey);

            queryClient.setQueryData(queryKey, (old: LossControl[] = []) =>
                old.filter(lossControl => lossControl.id !== variables)
            );

            return { previousLossControls };
        },
        onSuccess: () => {
            // Invalidate all loss control queries to ensure consistency
            queryClient.invalidateQueries({ queryKey: [LOSS_CONTROL_QUERY_KEY[0]] });
            toast.success('Perda excluída com sucesso!');
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousLossControls);

            toast.error('Erro ao excluir perda');
        }
    })

    return {
        deleteLossControl: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 