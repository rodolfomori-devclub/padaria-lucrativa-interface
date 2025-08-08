import { z } from "zod";

// Sale schema for individual sale creation/update
export const saleSchema = z.object({
  day: z.string().min(1, "Data é obrigatória"),
  value: z.number().min(0.01, "Valor deve ser maior que zero"),
});

export type SaleFormData = z.infer<typeof saleSchema>;

// Purchase schema for individual purchase creation/update
export const purchaseSchema = z.object({
  day: z.string().min(1, "Data é obrigatória"),
  value: z.number().min(0.01, "Valor deve ser maior que zero"),
});

export type PurchaseFormData = z.infer<typeof purchaseSchema>;

// Schema for the editable table form (all projections for a month)
export const salesProjectionSchema = z.object({
  projections: z.array(
    z.object({
      day: z.string().min(1, "Data é obrigatória"),
      salesValue: z.number().min(0, "Valor de venda deve ser maior ou igual a zero").optional(),
      purchaseValue: z.number().min(0, "Valor de compra deve ser maior ou igual a zero").optional(),
    })
  ),
});

export type SalesProjectionFormData = z.infer<typeof salesProjectionSchema>;
