import { api } from "~/lib/axios"
import type { BoletoFilters, PaginatedBoletoResponse } from "~/types/boleto"

export const getAllBoletos = async (filters?: BoletoFilters): Promise<PaginatedBoletoResponse> => {
    const params = new URLSearchParams()

    if (filters) {
        if (filters.month) params.append('month', filters.month.toString())
        if (filters.year) params.append('year', filters.year.toString())
        if (filters.fromDate) params.append('fromDate', filters.fromDate.toISOString())
        if (filters.toDate) params.append('toDate', filters.toDate.toISOString())
        if (filters.supplierId) params.append('supplierId', filters.supplierId)
        if (filters.paid !== undefined) params.append('paid', filters.paid.toString())
        if (filters.page) params.append('page', filters.page.toString())
        if (filters.limit) params.append('limit', filters.limit.toString())
    }
    const { data } = await api.get<PaginatedBoletoResponse>(`/bills?${params.toString()}`)
    return data
} 