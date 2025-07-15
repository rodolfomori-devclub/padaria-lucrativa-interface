import { useQuery } from '@tanstack/react-query'
import { supplierService } from '~/services/suppliers'
import type { Supplier } from '~/types/supplier'
import { SUPPLIERS_QUERY_KEY } from './useCreateSupplierMutation'

export const useSuppliers = () => {
    const {
        data: suppliers = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: SUPPLIERS_QUERY_KEY,
        queryFn: async (): Promise<Supplier[]> => {
            const response = await supplierService.getAll()
            return response
        },
    })

    return {
        suppliers: suppliers.filter(supplier => supplier.isActive),
        allSuppliers: suppliers, // For select options
        isLoading,
        error,
    }
} 