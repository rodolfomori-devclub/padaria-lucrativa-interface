import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { inputService } from "~/services/inputs";
import type { CreateInputData, Input } from "~/types/input";

export const INPUTS_QUERY_KEY = ['inputs'];

export function useCreateInputMutation() {
    const { mutateAsync: createInput, isPending } = useMutation({
        mutationFn: (data: CreateInputData) => inputService.create(data),
        onMutate: (variables) => {
            const tempInputId = Math.random().toString();

            const previousInputs = queryClient.getQueryData<Input[]>(INPUTS_QUERY_KEY)

            queryClient.setQueryData(INPUTS_QUERY_KEY, (old: Input[]) => [...old, {
                ...variables,
                id: tempInputId,
                unitCost: 0, // Will be calculated by backend
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }])

            return { previousInputs, tempInputId }
        },
        onSuccess: (data, _variables, context) => {
            queryClient.setQueryData(INPUTS_QUERY_KEY, (old: Input[]) =>
                old.map(input => input.id === context?.tempInputId ? data : input)
            )
            toast.success('Insumo criado com sucesso')
        },
        onError: (error, _variables, context) => {
            queryClient.setQueryData(INPUTS_QUERY_KEY, context?.previousInputs)
            toast.error(error.message || 'Erro ao criar insumo')
        }
    })

    return { createInput, isPending }
} 