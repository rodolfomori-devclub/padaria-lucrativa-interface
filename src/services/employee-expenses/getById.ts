import { api } from "~/lib/axios"

export const getEmployeeExpenseById = async (id: string) => {
    const { data } = await api.get(`/employee-expenses/${id}`)
    return data.data
} 