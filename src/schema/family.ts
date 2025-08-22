import { z } from "zod";

export const familySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  profitParticipation: z.coerce
    .number({
      invalid_type_error: "Participação no lucro deve ser um número",
    })
    .min(0, "Participação no lucro deve ser maior ou igual a zero")
    .max(99, "Participação no lucro deve ser menor que 100")
    .optional(),
  profitMargin: z.coerce
    .number({
      invalid_type_error: "Margem de lucro deve ser um número",
    })
    .min(0, "Margem de lucro deve ser maior ou igual a zero")
    .optional(),
  coefficient: z.coerce
    .number({
      invalid_type_error: "Coeficiente deve ser um número",
    })
    .min(0, "Coeficiente deve ser maior ou igual a zero")
    .optional(),
  contribution: z.coerce
    .number({
      invalid_type_error: "Contribuição deve ser um número",
    })
    .min(0, "Contribuição deve ser maior ou igual a zero")
    .optional(),
});

export type FamilyFormData = z.infer<typeof familySchema>;
