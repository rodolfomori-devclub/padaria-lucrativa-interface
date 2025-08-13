import { useQuery } from '@tanstack/react-query'
import { clientService } from '~/services/admin/clientes'
import type { User } from '~/types/user'
import { CLIENTS_QUERY_KEY } from './useClients'

export const useGetClient = (id: string) => {
    const {
        data: client,
        isLoading,
        error,
    } = useQuery({
        queryKey: [...CLIENTS_QUERY_KEY, id],
        queryFn: async (): Promise<User> => {
            const response = await clientService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return {
        client,
        isLoading,
        error,
    }
}
