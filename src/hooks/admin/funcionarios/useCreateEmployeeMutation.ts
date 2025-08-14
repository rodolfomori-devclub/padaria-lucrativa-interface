import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import type { CreateEmployeeFormData } from "~/schema/employee";
import { employeeService } from "~/services/admin/employee";
import type { PaginatedClientsResponse } from "~/types/client";
import { UserRole, type User } from "~/types/user";
import { EMPLOYEES_QUERY_KEY } from "./useEmployees";

export function useCreateEmployeeMutation() {
    const { mutateAsync: createEmployee, isPending } = useMutation({
        mutationFn: (data: CreateEmployeeFormData) => employeeService.create(data),
        onMutate: (variables) => {
            const tempEmployeeId = Math.random().toString();

            const previousEmployees = queryClient.getQueryData<PaginatedClientsResponse>(EMPLOYEES_QUERY_KEY);

            if (previousEmployees) {
                queryClient.setQueryData(EMPLOYEES_QUERY_KEY, {
                    ...previousEmployees,
                    data: [...previousEmployees.data, {
                        ...variables,
                        id: tempEmployeeId,
                        role: UserRole.EMPLOYEE,
                        createdAt: new Date().toISOString(),
                    } as User]
                });
            }

            return { previousEmployees, tempEmployeeId };
        },
        onSuccess: (data, _variables, context) => {
            const previousEmployees = queryClient.getQueryData<PaginatedClientsResponse>(EMPLOYEES_QUERY_KEY);

            if (previousEmployees && context) {
                queryClient.setQueryData(EMPLOYEES_QUERY_KEY, {
                    ...previousEmployees,
                    data: previousEmployees.data.map(employee =>
                        employee.id === context.tempEmployeeId ? data : employee
                    )
                });
            }

            // Invalidate to ensure fresh data
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEY });
            toast.success('Funcionário criado com sucesso');
        },
        onError: (error: AxiosError, _variables, context) => {
            if (context?.previousEmployees) {
                queryClient.setQueryData(EMPLOYEES_QUERY_KEY, context.previousEmployees);
            }
            toast.error((error.response?.data as { message: string }).message || 'Erro ao criar funcionário');
        }
    });

    return { createEmployee, isPending };
}
