import { useQuery } from '@tanstack/react-query'
import { supplierService } from '~/services/suppliers'
import type { Supplier } from '~/types/supplier'
import { SUPPLIERS_QUERY_KEY } from './useCreateSupplierMutation'

export const useGetSupplier = (id: string) => {
    const {
        data: supplier,
        isLoading,
        error,
    } = useQuery({
        queryKey: [...SUPPLIERS_QUERY_KEY, id],
        queryFn: async (): Promise<Supplier> => {
            const response = await supplierService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return {
        supplier,
        isLoading,
        error,
    }
} 