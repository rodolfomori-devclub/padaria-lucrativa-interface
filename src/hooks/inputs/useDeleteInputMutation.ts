import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { inputService } from "~/services/inputs";
import type { Input } from "~/types/input";
import { INPUTS_QUERY_KEY } from "./useCreateInputMutation";


export function useDeleteInputMutation() {
    const { mutateAsync: deleteInput, isPending } = useMutation({
        mutationFn: (id: string) => inputService.delete(id),
        onMutate: (variables) => {
            const previousInputs = queryClient.getQueryData<Input[]>(INPUTS_QUERY_KEY)

            queryClient.setQueryData(INPUTS_QUERY_KEY, (old: Input[]) => old.map(input => input.id === variables ? { ...input, isActive: false } : input))

            return { previousInputs }
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData(INPUTS_QUERY_KEY, (old: Input[]) => old.map(input => input.id === variables ? data : input))
            toast.success('Insumo removido com sucesso')
        },
        onError: (error, _variables, context) => {
            queryClient.setQueryData(INPUTS_QUERY_KEY, context?.previousInputs)
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message)
            } else {
                toast.error('Erro ao remover insumo')
            }
        }
    })

    return { deleteInput, isPending }
}