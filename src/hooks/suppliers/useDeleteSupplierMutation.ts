import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { queryClient } from '~/lib/queryClient'
import { supplierService } from '~/services/suppliers'
import type { Supplier } from '~/types/supplier'
import { SUPPLIERS_QUERY_KEY } from './useCreateSupplierMutation'

export const useDeleteSupplierMutation = () => {
    const mutation = useMutation({
        mutationFn: (id: string) => supplierService.delete(id),
        onMutate: (variables) => {
            const previousSuppliers = queryClient.getQueryData<Supplier[]>(SUPPLIERS_QUERY_KEY);

            queryClient.setQueryData(SUPPLIERS_QUERY_KEY, (old: Supplier[] = []) =>
                old.map(supplier => supplier.id === variables ? { ...supplier, isActive: false } : supplier)
            );

            return { previousSuppliers };
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData(SUPPLIERS_QUERY_KEY, (old: Supplier[] = []) =>
                old.map(supplier => supplier.id === variables ? data : supplier)
            );
            toast.success('Fornecedor excluído com sucesso!');
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(SUPPLIERS_QUERY_KEY, context?.previousSuppliers);

            toast.error('Erro ao excluir fornecedor');
        }
    })

    return {
        deleteSupplier: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 