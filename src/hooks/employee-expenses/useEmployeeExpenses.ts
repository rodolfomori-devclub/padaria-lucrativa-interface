import { useQuery } from '@tanstack/react-query';
import { employeeExpenseService } from '~/services/employee-expenses';
import type { EmployeeExpense, EmployeeExpenseFilters } from '~/types/employee-expense';

const EMPLOYEE_EXPENSES_QUERY_KEY = ['employee-expenses'];

export const useEmployeeExpenses = (filters?: EmployeeExpenseFilters) => {
    const queryKey = filters
        ? [EMPLOYEE_EXPENSES_QUERY_KEY[0], filters]
        : EMPLOYEE_EXPENSES_QUERY_KEY

    const {
        data: employeeExpenses = [],
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<EmployeeExpense[]> => {
            const response = await employeeExpenseService.getAll(filters)
            return response
        },
    })

    const total = employeeExpenses.reduce((acc, expense) => acc + expense.netSalary, 0) || null

    return {
        employeeExpenses,
        isLoading,
        error,
        total,
    }
} 