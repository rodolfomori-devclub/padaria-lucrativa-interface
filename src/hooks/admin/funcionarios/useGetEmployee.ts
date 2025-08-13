import { useQuery } from '@tanstack/react-query'
import { employeeService } from '~/services/admin/employee'
import type { User } from '~/types/user'
import { EMPLOYEES_QUERY_KEY } from './useEmployees'

export const useGetEmployee = (id: string) => {
    const {
        data: employee,
        isLoading,
        error,
    } = useQuery({
        queryKey: [...EMPLOYEES_QUERY_KEY, id],
        queryFn: async (): Promise<User> => {
            const response = await employeeService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return {
        employee,
        isLoading,
        error,
    }
}
