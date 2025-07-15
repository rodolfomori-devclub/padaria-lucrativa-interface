import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { queryClient } from '~/lib/queryClient'
import { supplierService } from '~/services/suppliers'
import type { Supplier, UpdateSupplierData } from '~/types/supplier'
import { SUPPLIERS_QUERY_KEY } from './useCreateSupplierMutation'

interface UpdateSupplierVariables {
    id: string;
    data: UpdateSupplierData;
}

export const useUpdateSupplierMutation = () => {
    const mutation = useMutation({
        mutationFn: async ({ id, data }: UpdateSupplierVariables) => {
            return await supplierService.update(id, data);
        },
        onMutate: async (variables) => {
            const previousSuppliers = queryClient.getQueryData<Supplier[]>(SUPPLIERS_QUERY_KEY);
            const previousSupplier = queryClient.getQueryData<Supplier>([...SUPPLIERS_QUERY_KEY, variables.id]);

            // Optimistically update suppliers list
            if (previousSuppliers) {
                queryClient.setQueryData<Supplier[]>(SUPPLIERS_QUERY_KEY, (old) =>
                    old?.map(supplier =>
                        supplier.id === variables.id
                            ? { ...supplier, ...variables.data, updatedAt: new Date() }
                            : supplier
                    ) ?? []
                );
            }

            // Optimistically update single supplier if it exists in cache
            if (previousSupplier) {
                queryClient.setQueryData<Supplier>([...SUPPLIERS_QUERY_KEY, variables.id], {
                    ...previousSupplier,
                    ...variables.data,
                    updatedAt: new Date()
                });
            }

            return { previousSuppliers, previousSupplier };
        },
        onSuccess: (data, variables) => {
            // Update both the list and individual supplier cache with real data
            queryClient.setQueryData<Supplier[]>(SUPPLIERS_QUERY_KEY, (old) =>
                old?.map(supplier => supplier.id === variables.id ? data : supplier) ?? []
            );

            queryClient.setQueryData<Supplier>([...SUPPLIERS_QUERY_KEY, variables.id], data);

            toast.success('Fornecedor atualizado com sucesso!');
        },
        onError: (_error, variables, context) => {
            // Rollback optimistic updates
            if (context?.previousSuppliers) {
                queryClient.setQueryData(SUPPLIERS_QUERY_KEY, context.previousSuppliers);
            }
            if (context?.previousSupplier) {
                queryClient.setQueryData([...SUPPLIERS_QUERY_KEY, variables.id], context.previousSupplier);
            }

            toast.error('Erro ao atualizar fornecedor');
        }
    })

    return {
        updateSupplier: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 