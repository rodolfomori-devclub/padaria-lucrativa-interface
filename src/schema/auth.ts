import { z } from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'E-mail é obrigatório')
        .email('E-mail inválido')
        .transform(email => email.toLowerCase()),
    password: z
        .string()
        .min(1, 'Senha é obrigatória')
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, 'Nome é obrigatório')
        .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z
        .string()
        .min(1, 'E-mail é obrigatório')
        .email('E-mail inválido')
        .transform(email => email.toLowerCase()),
    phone: z
        .string()
        .min(1, 'Telefone é obrigatório')
        .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (xx) xxxxx-xxxx'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória')
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
        .string()
        .min(1, 'Confirmação de senha é obrigatória')
        .min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'E-mail é obrigatório')
        .email('E-mail inválido'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema> 