import { useQuery } from '@tanstack/react-query'
import { employeeService } from '~/services/admin/employee'
import type { ClientFilters, PaginatedClientsResponse } from '~/types/client'

export const EMPLOYEES_QUERY_KEY = ['employees']

export const useEmployees = (filters?: ClientFilters) => {
    const queryKey = filters
        ? [EMPLOYEES_QUERY_KEY[0], filters]
        : EMPLOYEES_QUERY_KEY

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<PaginatedClientsResponse> => {
            const response = await employeeService.getAll(filters)
            return response
        },
    })

    return {
        employees: data?.data || [],
        meta: data?.meta,
        isLoading,
        error,
    }
}
