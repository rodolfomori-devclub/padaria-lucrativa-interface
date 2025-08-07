import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { inputService } from "~/services/inputs";
import type { Input, UpdateInputData } from "~/types/input";
import { RECIPES_QUERY_KEY } from "../recipes/useRecipes";
import { INPUTS_QUERY_KEY } from "./useCreateInputMutation";

interface UpdateInputVariables {
    id: string;
    data: UpdateInputData;
}

export function useUpdateInputMutation() {
    const { mutateAsync: updateInput, isPending } = useMutation({
        mutationFn: async ({ id, data }: UpdateInputVariables) => {
            return await inputService.update(id, data);
        },
        onMutate: async (variables) => {
            const previousInputs = queryClient.getQueryData<Input[]>(INPUTS_QUERY_KEY);
            const previousInput = queryClient.getQueryData<Input>([INPUTS_QUERY_KEY, variables.id]);

            // Optimistically update inputs list
            if (previousInputs) {
                queryClient.setQueryData<Input[]>(INPUTS_QUERY_KEY, (old) =>
                    old?.map(input =>
                        input.id === variables.id
                            ? { ...input, ...variables.data, updatedAt: new Date() }
                            : input
                    ) ?? []
                );
            }

            // Optimistically update single input if it exists in cache
            if (previousInput) {
                queryClient.setQueryData<Input>([INPUTS_QUERY_KEY, variables.id], {
                    ...previousInput,
                    ...variables.data,
                    updatedAt: new Date()
                });
            }

            return { previousInputs, previousInput };
        },
        onSuccess: (data, variables) => {
            // Update both the list and individual input cache with real data
            queryClient.setQueryData<Input[]>(INPUTS_QUERY_KEY, (old) =>
                old?.map(input => input.id === variables.id ? data : input) ?? []
            );

            queryClient.setQueryData<Input>([INPUTS_QUERY_KEY, variables.id], data);

            if (data.price && variables.data.price) {
                queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY })
            }

            toast.success('Insumo atualizado com sucesso');
        },
        onError: (error, variables, context) => {
            // Rollback optimistic updates
            if (context?.previousInputs) {
                queryClient.setQueryData(INPUTS_QUERY_KEY, context.previousInputs);
            }
            if (context?.previousInput) {
                queryClient.setQueryData([INPUTS_QUERY_KEY, variables.id], context.previousInput);
            }

            toast.error((error as AxiosError<{ message: string }>).response?.data.message || 'Erro ao atualizar insumo');
        }
    });

    return { updateInput, isPending };
} 