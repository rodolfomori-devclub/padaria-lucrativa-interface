import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { employeeService } from "~/services/admin/employee";
import type { PaginatedClientsResponse } from "~/types/client";
import { EMPLOYEES_QUERY_KEY } from "./useEmployees";

export function useDeleteEmployeeMutation() {
    const { mutateAsync: deleteEmployee, isPending } = useMutation({
        mutationFn: (id: string) => employeeService.delete(id),
        onMutate: async (id) => {
            const previousEmployees = queryClient.getQueryData<PaginatedClientsResponse>(EMPLOYEES_QUERY_KEY);

            if (previousEmployees) {
                queryClient.setQueryData(EMPLOYEES_QUERY_KEY, {
                    ...previousEmployees,
                    data: previousEmployees.data.filter(employee => employee.id !== id)
                });
            }

            return { previousEmployees };
        },
        onSuccess: () => {
            // Invalidate to ensure fresh data and proper pagination
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEY });
            toast.success('Funcionário excluído com sucesso');
        },
        onError: (error: AxiosError, _variables, context) => {
            if (context?.previousEmployees) {
                queryClient.setQueryData(EMPLOYEES_QUERY_KEY, context.previousEmployees);
            }
            toast.error((error.response?.data as { message: string }).message || 'Erro ao excluir funcionário');
        }
    });

    return { deleteEmployee, isPending };
}
