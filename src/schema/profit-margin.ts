import { z } from "zod";

const optionalPercentage = (msg: string) =>
  z
    .number()
    .min(0, msg)
    .max(100, "Percentual não pode ser maior que 100%")
    .optional();

export const profitMarginSchema = z.object({
  cardPercentage: z
    .number()
    .min(0, "Percentual de vendas no cartão deve ser maior ou igual a zero")
    .max(100, "Percentual não pode ser maior que 100%"),
  lossPercentage: z
    .number()
    .min(0, "Percentual de perdas deve ser maior ou igual a zero")
    .max(100, "Percentual não pode ser maior que 100%"),
  cardTaxPercentage: z
    .number()
    .min(0, "Percentual de taxa do cartão deve ser maior ou igual a zero")
    .max(100, "Percentual não pode ser maior que 100%"),
  breakagePercentage: z
    .number()
    .min(0, "Percentual de quebra deve ser maior ou igual a zero")
    .max(100, "Percentual não pode ser maior que 100%"),
  packagingPercentage: z
    .number()
    .min(0, "Percentual de embalagens deve ser maior ou igual a zero")
    .max(100, "Percentual não pode ser maior que 100%"),
  expectedTaxPercentage: optionalPercentage(
    "Imposto previsto deve ser maior ou igual a zero"
  ),
  ownManufacturingSharePercentage: optionalPercentage(
    "Participação Fabricação Própria deve ser maior ou igual a zero"
  ),
  resaleProductsSharePercentage: optionalPercentage(
    "Participação produtos de revenda deve ser maior ou igual a zero"
  ),
  expectedNetMarginPercentage: optionalPercentage(
    "Margem Líquida Prevista deve ser maior ou igual a zero"
  ),
  averageResaleProductsMarginPercentage: optionalPercentage(
    "Margem Média dos produtos de Revenda deve ser maior ou igual a zero"
  ),
});

export type ProfitMarginFormData = z.infer<typeof profitMarginSchema>;
