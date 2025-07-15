import { useQuery } from "@tanstack/react-query"
import { inputService } from "~/services/inputs"
import { INPUTS_QUERY_KEY } from "./useCreateInputMutation"

export const useGetInput = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: [INPUTS_QUERY_KEY, id],
        queryFn: async () => {
            const response = await inputService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return { data, isLoading, error }
} 