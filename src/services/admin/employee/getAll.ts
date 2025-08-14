import { api } from "~/lib/axios"
import type { ClientFilters, PaginatedClientsResponse } from "~/types/client"

export const getAll = async (filters?: ClientFilters): Promise<PaginatedClientsResponse> => {

    const url = new URLSearchParams()
    if (filters?.search) {
        url.set('search', filters.search)
    }
    if (filters?.page) {
        url.set('page', filters.page.toString())
    }
    if (filters?.limit) {
        url.set('limit', filters.limit.toString())
    }

    const { data } = await api.get(`/admin/employees?${url.toString()}`)

    return data as PaginatedClientsResponse

}