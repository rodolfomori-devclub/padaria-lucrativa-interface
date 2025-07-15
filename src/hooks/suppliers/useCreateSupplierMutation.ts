import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { queryClient } from '~/lib/queryClient'
import { supplierService } from '~/services/suppliers'
import type { CreateSupplierData, Supplier } from '~/types/supplier'

export const SUPPLIERS_QUERY_KEY = ['suppliers']

export const useCreateSupplierMutation = () => {
    const mutation = useMutation({
        mutationFn: (data: CreateSupplierData) => supplierService.create(data),
        onMutate: (variables) => {
            const tempSupplierId = Math.random().toString();

            const previousSuppliers = queryClient.getQueryData<Supplier[]>(SUPPLIERS_QUERY_KEY);

            queryClient.setQueryData(SUPPLIERS_QUERY_KEY, (old: Supplier[] = []) => [...old, {
                ...variables,
                id: tempSupplierId,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            } as Supplier]);

            return { previousSuppliers, tempSupplierId };
        },
        onSuccess: (data, _variables, context) => {
            queryClient.setQueryData(SUPPLIERS_QUERY_KEY, (old: Supplier[] = []) =>
                old.map(supplier => supplier.id === context?.tempSupplierId ? data : supplier)
            );
            toast.success('Fornecedor criado com sucesso!');
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(SUPPLIERS_QUERY_KEY, context?.previousSuppliers);
            toast.error('Erro ao criar fornecedor');
        }
    })

    return {
        createSupplier: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    }
} 