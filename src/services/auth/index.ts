import { forgotPassword } from "./forgot-password";
import { login } from "./login";
import { me } from "./me";
import { register } from "./register";
import { resetPassword } from "./reset-password";
import { validateResetToken } from "./validate-reset-token";

export const authService = {
    login,
    register,
    me,
    forgotPassword,
    validateResetToken,
    resetPassword,
};
