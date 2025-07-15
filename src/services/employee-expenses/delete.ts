import { api } from "~/lib/axios"

export const deleteEmployeeExpense = async (id: string) => {
    const response = await api.delete(`/employee-expenses/${id}`)
    return response.data
} 