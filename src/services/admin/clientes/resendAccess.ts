import { api } from "~/lib/axios"

export const resendClientAccess = async (idOrEmail: string): Promise<{ message: string; email: string }> => {
    const { data } = await api.post(`/users/${encodeURIComponent(idOrEmail)}/resend-access`)
    return data
}
