import { z } from "zod"

export const jobSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
})

export type JobFormData = z.infer<typeof jobSchema> 