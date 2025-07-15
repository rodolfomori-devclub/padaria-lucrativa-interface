import { api } from "~/lib/axios"
import type { LossControlFilters } from "~/types/loss-control"

export const getAllLossControls = async (filters?: LossControlFilters) => {
    const params = new URLSearchParams()

    if (filters) {
        if (filters.month) params.append('month', filters.month.toString())
        if (filters.year) params.append('year', filters.year.toString())
        if (filters.fromDate) params.append('fromDate', filters.fromDate.toISOString())
        if (filters.toDate) params.append('toDate', filters.toDate.toISOString())
        if (filters.search) params.append('search', filters.search)
    }
    const { data } = await api.get(`/loss-control?${params.toString()}`)
    return data.data
} 