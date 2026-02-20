import { z } from "zod";

export const RecurrencePatternEnum = z.enum([
  "MONTHLY",
  "QUARTERLY",
  "SEMIANNUAL",
  "ANNUAL",
]);

const baseBoletoSchema = z.object({
  supplierId: z.string().min(1, "Fornecedor é obrigatório"),
  value: z.number().min(0.01, "Valor deve ser maior que zero"),
  dueDate: z.string().min(1, "Data de vencimento é obrigatória"),
  observations: z
    .string()
    .max(500, "Observações deve ter no máximo 500 caracteres")
    .optional(),
  isRecurring: z.boolean().optional(),
  recurrencePattern: RecurrencePatternEnum.optional(),
  recurringStartDate: z
    .string({ message: "Data de início da recorrência é obrigatória" })
    .optional(),
  recurringDayOfMonth: z
    .number({ message: "Dia do mês da recorrência é obrigatório" })
    .min(1)
    .max(31)
    .optional(),
});

export const boletoSchema = baseBoletoSchema.refine(
  (data) => {
    if (data.isRecurring) {
      return (
        !!data.recurrencePattern &&
        !!data.recurringStartDate &&
        !!data.recurringDayOfMonth
      );
    }
    return true;
  },
  {
    message:
      'Todos os campos de recorrência são obrigatórios quando "Tornar recorrente" está ativado',
    path: ["isRecurring"],
  },
);

export const updateBoletoSchema = baseBoletoSchema.extend({
  isPayed: z.boolean().optional(),
  paymentDate: z.string().optional(),
});

export type BoletoFormData = z.infer<typeof boletoSchema>;
export type UpdateBoletoFormData = z.infer<typeof updateBoletoSchema>;
