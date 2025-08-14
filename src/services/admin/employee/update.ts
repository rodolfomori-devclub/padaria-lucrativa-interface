import { api } from "~/lib/axios"
import type { CreateEmployeeFormData } from "~/schema/employee"
import type { User } from "~/types/user"

export const updateEmployee = async (id: string, data: CreateEmployeeFormData): Promise<User> => {
    const { data: response } = await api.put(`/admin/employees/${id}`, data)
    return response
}
