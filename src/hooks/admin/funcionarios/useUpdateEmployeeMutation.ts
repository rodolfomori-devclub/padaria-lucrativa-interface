import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import type { CreateEmployeeFormData } from "~/schema/employee";
import { employeeService } from "~/services/admin/employee";
import type { PaginatedClientsResponse } from "~/types/client";
import { EMPLOYEES_QUERY_KEY } from "./useEmployees";

interface UpdateEmployeeVariables {
    id: string;
    data: CreateEmployeeFormData;
}

export function useUpdateEmployeeMutation() {
    const { mutateAsync: updateEmployee, isPending } = useMutation({
        mutationFn: async ({ id, data }: UpdateEmployeeVariables) => {
            return await employeeService.update(id, data);
        },
        onMutate: async (variables) => {
            const previousEmployees = queryClient.getQueryData<PaginatedClientsResponse>(EMPLOYEES_QUERY_KEY);

            if (previousEmployees) {
                queryClient.setQueryData(EMPLOYEES_QUERY_KEY, {
                    ...previousEmployees,
                    data: previousEmployees.data.map(employee =>
                        employee.id === variables.id
                            ? { ...employee, ...variables.data }
                            : employee
                    )
                });
            }

            return { previousEmployees };
        },
        onSuccess: (data, variables) => {
            const previousEmployees = queryClient.getQueryData<PaginatedClientsResponse>(EMPLOYEES_QUERY_KEY);

            if (previousEmployees) {
                queryClient.setQueryData(EMPLOYEES_QUERY_KEY, {
                    ...previousEmployees,
                    data: previousEmployees.data.map(employee =>
                        employee.id === variables.id ? data : employee
                    )
                });
            }

            toast.success('Funcionário atualizado com sucesso');
        },
        onError: (error: AxiosError, _variables, context) => {
            if (context?.previousEmployees) {
                queryClient.setQueryData(EMPLOYEES_QUERY_KEY, context.previousEmployees);
            }
            toast.error((error.response?.data as { message: string }).message || 'Erro ao atualizar funcionário');
        }
    });

    return { updateEmployee, isPending };
}
