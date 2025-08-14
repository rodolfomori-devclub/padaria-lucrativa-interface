import { z } from 'zod'
import { PlanType } from '~/types/plan'

export const createClientSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido').transform(email => email.toLowerCase()),
    phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    planType: z.nativeEnum(PlanType),
    expiresAt: z.string().min(1, 'Data de expiração é obrigatória'),
})

export const updateClientSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
    email: z.string().email('Email inválido').transform(email => email.toLowerCase()).optional(),
    phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres').optional(),
    planType: z.nativeEnum(PlanType).optional(),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').optional(),
    expiresAt: z.string().min(1, 'Data de expiração é obrigatória').optional(),
})

export const clientFiltersSchema = z.object({
    search: z.string().optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional(),
})

export type CreateClientFormData = z.infer<typeof createClientSchema>
export type UpdateClientFormData = z.infer<typeof updateClientSchema>
export type ClientFiltersFormData = z.infer<typeof clientFiltersSchema>
