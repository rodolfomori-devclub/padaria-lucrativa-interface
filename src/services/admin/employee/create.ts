import { api } from "~/lib/axios"
import type { CreateEmployeeFormData } from "~/schema/employee"
import type { User } from "~/types/user"

export const createEmployee = async (data: CreateEmployeeFormData): Promise<User> => {
    const response = await api.post('/admin/employees', data)
    return response.data.user
}
