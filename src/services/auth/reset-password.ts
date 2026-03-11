import { api } from "~/lib/axios";
import type { ResetPasswordData } from "~/types/auth";

export const resetPassword = async (data: ResetPasswordData) => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
};
