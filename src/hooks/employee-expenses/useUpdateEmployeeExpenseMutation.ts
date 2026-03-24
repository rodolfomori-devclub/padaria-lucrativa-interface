import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEmployeeExpenseFilters } from "~/hooks/filters/employee-expense-filters";
import { queryClient } from "~/lib/queryClient";
import { employeeExpenseService } from "~/services/employee-expenses";
import type {
  EmployeeExpense,
  PaginatedEmployeeExpenseResponse,
  UpdateEmployeeExpenseData,
} from "~/types/employee-expense";
import { EMPLOYEE_EXPENSES_QUERY_KEY } from "./useCreateEmployeeExpenseMutation";
import { DASHBOARD_QUERY_KEY } from "../dashboard/useDashboardData";

interface UpdateEmployeeExpenseVariables {
  id: string;
  data: UpdateEmployeeExpenseData;
}

export function useUpdateEmployeeExpenseMutation() {
  const { filters } = useEmployeeExpenseFilters();
  const queryKey = [EMPLOYEE_EXPENSES_QUERY_KEY[0], filters];

  const { mutateAsync: updateEmployeeExpense, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateEmployeeExpenseVariables) => {
      return await employeeExpenseService.update(id, data);
    },
    onMutate: async (variables) => {
      const previousEmployeeExpenses =
        queryClient.getQueryData<PaginatedEmployeeExpenseResponse>(queryKey);
      const previousEmployeeExpense = queryClient.getQueryData<EmployeeExpense>(
        [queryKey, variables.id],
      );

      // Optimistically update employee expenses list
      if (previousEmployeeExpenses) {
        queryClient.setQueryData<PaginatedEmployeeExpenseResponse>(
          queryKey,
          (old) => ({
            data: (old?.data || []).map((expense) =>
              expense.id === variables.id
                ? {
                    ...expense,
                    ...variables.data,
                    recurringStartDate: variables.data.recurringStartDate
                      ? new Date(variables.data.recurringStartDate)
                      : expense.recurringStartDate,
                    updatedAt: new Date(),
                  }
                : expense,
            ),
            meta: old?.meta || {
              total: 0,
              page: 1,
              limit: 10,
              totalPages: 0,
              hasNext: false,
              hasPrev: false,
            },
          }),
        );
      }

      // Optimistically update single employee expense if it exists in cache
      if (previousEmployeeExpense) {
        queryClient.setQueryData<EmployeeExpense>([queryKey, variables.id], {
          ...previousEmployeeExpense,
          ...variables.data,
          recurringStartDate: variables.data.recurringStartDate
            ? new Date(variables.data.recurringStartDate)
            : previousEmployeeExpense.recurringStartDate,
          updatedAt: new Date(),
        });
      }

      return { previousEmployeeExpenses, previousEmployeeExpense };
    },
    onSuccess: (data, variables) => {
      // Update both the list and individual employee expense cache with real data
      queryClient.setQueryData<PaginatedEmployeeExpenseResponse>(
        queryKey,
        (old) => ({
          data: (old?.data || []).map((expense) =>
            expense.id === variables.id ? data : expense,
          ),
          meta: old?.meta || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        }),
      );

      queryClient.setQueryData<EmployeeExpense>([queryKey, variables.id], data);

      toast.success("Despesa com pessoal atualizada com sucesso");
    },
    onError: (_error, variables, context) => {
      // Rollback optimistic updates
      if (context?.previousEmployeeExpenses) {
        queryClient.setQueryData(queryKey, context.previousEmployeeExpenses);
      }
      if (context?.previousEmployeeExpense) {
        queryClient.setQueryData(
          [queryKey, variables.id],
          context.previousEmployeeExpense,
        );
      }

      toast.error("Erro ao atualizar despesa com pessoal");
    },
    onSettled: () => {
      // Invalidate all employee-expenses queries (different filters, pages, etc.)
      queryClient.invalidateQueries({
        queryKey: EMPLOYEE_EXPENSES_QUERY_KEY,
      });

      // Invalidate dashboard since it uses employee expenses data
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEY,
      });
    },
  });

  return { updateEmployeeExpense, isPending };
}
