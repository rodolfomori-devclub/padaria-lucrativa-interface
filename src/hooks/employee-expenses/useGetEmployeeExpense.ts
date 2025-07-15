import { useQuery } from '@tanstack/react-query'
import { employeeExpenseService } from '~/services/employee-expenses'
import type { EmployeeExpense } from '~/types/employee-expense'
import { EMPLOYEE_EXPENSES_QUERY_KEY } from './useCreateEmployeeExpenseMutation'

export const useGetEmployeeExpense = (id: string) => {
    const {
        data: employeeExpense,
        isLoading,
        error,
    } = useQuery({
        queryKey: [...EMPLOYEE_EXPENSES_QUERY_KEY, id],
        queryFn: async (): Promise<EmployeeExpense> => {
            const response = await employeeExpenseService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return {
        employeeExpense,
        isLoading,
        error,
    }
} 