import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { clientService } from "~/services/admin/clientes";
import type { PaginatedClientsResponse } from "~/types/client";
import { CLIENTS_QUERY_KEY } from "./useClients";

export function useDeleteClientMutation() {
    const { mutateAsync: deleteClient, isPending } = useMutation({
        mutationFn: (id: string) => clientService.delete(id),
        onMutate: async (id) => {
            const previousClients = queryClient.getQueryData<PaginatedClientsResponse>(CLIENTS_QUERY_KEY);

            if (previousClients) {
                queryClient.setQueryData(CLIENTS_QUERY_KEY, {
                    ...previousClients,
                    data: previousClients.data.filter(client => client.id !== id)
                });
            }

            return { previousClients };
        },
        onSuccess: () => {
            // Invalidate to ensure fresh data and proper pagination
            queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
            toast.success('Cliente excluído com sucesso');
        },
        onError: (error: AxiosError, _variables, context) => {
            if (context?.previousClients) {
                queryClient.setQueryData(CLIENTS_QUERY_KEY, context.previousClients);
            }
            toast.error((error.response?.data as { message: string }).message || 'Erro ao excluir cliente');
        }
    });

    return { deleteClient, isPending };
}
