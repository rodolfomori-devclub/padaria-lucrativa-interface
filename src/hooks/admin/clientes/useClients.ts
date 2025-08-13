import { useQuery } from '@tanstack/react-query'
import { clientService } from '~/services/admin/clientes'
import type { ClientFilters, PaginatedClientsResponse } from '~/types/client'

export const CLIENTS_QUERY_KEY = ['clients']

export const useClients = (filters?: ClientFilters) => {
    const queryKey = filters
        ? [CLIENTS_QUERY_KEY[0], filters]
        : CLIENTS_QUERY_KEY

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<PaginatedClientsResponse> => {
            const response = await clientService.getAll(filters)
            return response
        },
    })

    return {
        clients: data?.data || [],
        meta: data?.meta,
        isLoading,
        error,
    }
}
