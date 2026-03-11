import { api } from "~/lib/axios";

export const validateResetToken = async (token: string) => {
    const response = await api.get<{ valid: boolean }>(
        `/auth/validate-reset-token?token=${encodeURIComponent(token)}`
    );
    return response.data;
};
