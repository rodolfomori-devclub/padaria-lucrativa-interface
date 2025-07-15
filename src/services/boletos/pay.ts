import { api } from "~/lib/axios"

export const payBoleto = async (id: string) => {
    const { data } = await api.patch(`/bills/${id}/mark-as-paid`)
    return data.data
}