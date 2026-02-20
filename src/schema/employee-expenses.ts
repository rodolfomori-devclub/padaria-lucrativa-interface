import { z } from "zod";

export const employeeExpenseSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(100, "Nome deve ter no máximo 100 caracteres"),
    jobId: z.string().min(1, "Cargo é obrigatório"),
    baseSalary: z
      .number()
      .min(0, "Salário base deve ser maior ou igual a zero"),
    extraHours: z.number().optional(),
    transport: z.number().optional(),
    meal: z.number().optional(),
    isRecurring: z.boolean().optional(),
    recurringStartDate: z
      .string({ message: "Data de início da recorrência é obrigatória" })
      .optional(),
    recurringDayOfMonth: z
      .number({ message: "Dia do mês da recorrência é obrigatório" })
      .min(1)
      .max(31)
      .optional(),
  })
  .refine(
    (data) => {
      if (data.isRecurring) {
        return !!data.recurringStartDate && !!data.recurringDayOfMonth;
      }
      return true;
    },
    {
      message:
        "Data de início e dia do mês são obrigatórios para funcionários recorrentes",
      path: ["isRecurring"],
    },
  );

export type EmployeeExpenseFormData = z.infer<typeof employeeExpenseSchema>;
