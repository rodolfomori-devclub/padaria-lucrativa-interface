import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { clientService } from "~/services/admin/clientes";
import type { CreateClientData, PaginatedClientsResponse } from "~/types/client";
import type { User } from "~/types/user";
import { CLIENTS_QUERY_KEY } from "./useClients";

export function useCreateClientMutation() {
    const { mutateAsync: createClient, isPending } = useMutation({
        mutationFn: (data: CreateClientData) => clientService.create(data),
        onMutate: (variables) => {
            const tempClientId = Math.random().toString();

            const previousClients = queryClient.getQueryData<PaginatedClientsResponse>(CLIENTS_QUERY_KEY);

            if (previousClients) {
                queryClient.setQueryData(CLIENTS_QUERY_KEY, {
                    ...previousClients,
                    data: [...previousClients.data, {
                        ...variables,
                        id: tempClientId,
                        role: 'CLIENT',
                        createdAt: new Date().toISOString(),
                    } as User]
                });
            }

            return { previousClients, tempClientId };
        },
        onSuccess: (data, _variables, context) => {
            const previousClients = queryClient.getQueryData<PaginatedClientsResponse>(CLIENTS_QUERY_KEY);

            if (previousClients && context) {
                queryClient.setQueryData(CLIENTS_QUERY_KEY, {
                    ...previousClients,
                    data: previousClients.data.map(client =>
                        client.id === context.tempClientId ? data : client
                    )
                });
            }

            // Invalidate to ensure fresh data
            queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
            toast.success('Cliente criado com sucesso');
        },
        onError: (error: AxiosError, _variables, context) => {
            if (context?.previousClients) {
                queryClient.setQueryData(CLIENTS_QUERY_KEY, context.previousClients);
            }
            toast.error((error.response?.data as { message: string }).message || 'Erro ao criar cliente');
        }
    });

    return { createClient, isPending };
}
