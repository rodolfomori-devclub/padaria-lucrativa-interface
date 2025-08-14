import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { clientService } from "~/services/admin/clientes";
import type { PaginatedClientsResponse, UpdateClientData } from "~/types/client";
import { CLIENTS_QUERY_KEY } from "./useClients";

interface UpdateClientVariables {
    id: string;
    data: UpdateClientData;
}

export function useUpdateClientMutation() {
    const { mutateAsync: updateClient, isPending } = useMutation({
        mutationFn: async ({ id, data }: UpdateClientVariables) => {
            return await clientService.update(id, data);
        },
        onMutate: async (variables) => {
            const previousClients = queryClient.getQueryData<PaginatedClientsResponse>(CLIENTS_QUERY_KEY);

            if (previousClients) {
                queryClient.setQueryData(CLIENTS_QUERY_KEY, {
                    ...previousClients,
                    data: previousClients.data.map(client =>
                        client.id === variables.id
                            ? { ...client, ...variables.data }
                            : client
                    )
                });
            }

            return { previousClients };
        },
        onSuccess: (data, variables) => {
            const previousClients = queryClient.getQueryData<PaginatedClientsResponse>(CLIENTS_QUERY_KEY);

            if (previousClients) {
                queryClient.setQueryData(CLIENTS_QUERY_KEY, {
                    ...previousClients,
                    data: previousClients.data.map(client =>
                        client.id === variables.id ? data : client
                    )
                });
            }

            toast.success('Cliente atualizado com sucesso');
        },
        onError: (error: AxiosError, _variables, context) => {
            if (context?.previousClients) {
                queryClient.setQueryData(CLIENTS_QUERY_KEY, context.previousClients);
            }
            toast.error((error.response?.data as { message: string }).message || 'Erro ao atualizar cliente');
        }
    });

    return { updateClient, isPending };
}
