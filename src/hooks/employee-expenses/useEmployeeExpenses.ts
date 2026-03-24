import { useQuery } from "@tanstack/react-query";
import { employeeExpenseService } from "~/services/employee-expenses";
import type {
  EmployeeExpenseFilters,
  PaginatedEmployeeExpenseResponse,
} from "~/types/employee-expense";

const EMPLOYEE_EXPENSES_QUERY_KEY = ["employee-expenses"];

export const useEmployeeExpenses = (filters?: EmployeeExpenseFilters) => {
  const queryKey = filters
    ? [EMPLOYEE_EXPENSES_QUERY_KEY[0], filters]
    : EMPLOYEE_EXPENSES_QUERY_KEY;

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async (): Promise<PaginatedEmployeeExpenseResponse> => {
      return await employeeExpenseService.getAll(filters);
    },
  });

  const total =
    data?.data.reduce((acc, expense) => acc + expense.netSalary, 0) || null;

  return {
    employeeExpenses: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    total,
  };
};
