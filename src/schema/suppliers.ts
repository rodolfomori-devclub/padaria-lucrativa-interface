import { z } from "zod"
import { getUnformattedDocument, isValidDocumentLength } from "~/utils/formaters"

export const supplierSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    cnpj: z.string()
        .min(1, 'CNPJ ou CPF é obrigatório')
        .refine(
            (value) => {
                const unformatted = getUnformattedDocument(value)
                return unformatted.length >= 11
            },
            'CNPJ ou CPF deve ter pelo menos 11 dígitos'
        )
        .refine(
            (value) => isValidDocumentLength(value),
            'CNPJ deve ter 14 dígitos ou CPF deve ter 11 dígitos'
        ),
})

export type SupplierFormData = z.infer<typeof supplierSchema> 