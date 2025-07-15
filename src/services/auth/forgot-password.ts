import { api } from "~/lib/axios";
import type { ForgotPasswordData } from "~/types/auth";

export const forgotPassword = async (data: ForgotPasswordData) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
};