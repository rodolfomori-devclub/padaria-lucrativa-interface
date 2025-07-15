import { useQuery } from '@tanstack/react-query'
import { inputService } from '~/services/inputs'
import type { Input } from '~/types/input'
import { INPUTS_QUERY_KEY } from './useCreateInputMutation'

export const useInputs = () => {
    const {
        data: inputs = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: INPUTS_QUERY_KEY,
        queryFn: async (): Promise<Input[]> => {
            const response = await inputService.getAll()
            return response
        },
    })

    return {
        inputs: inputs.filter(input => input.isActive),
        isLoading,
        error,
    }
} 