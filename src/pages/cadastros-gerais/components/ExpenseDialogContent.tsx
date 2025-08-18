import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Input as UIInput } from "~/components/ui/input";
import { useExpenseFilters } from "~/hooks/filters";
import { expenseSchema, type ExpenseFormData } from "~/schema/expenses";
import type { CreateExpenseData, Expense } from "~/types/expense";
import { formatCurrency, removeNonNumeric } from "~/utils/formaters";

interface ExpenseDialogContentProps {
  expense?: Expense;
  onSubmit: (data: CreateExpenseData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  isFixed: boolean;
}

export function ExpenseDialogContent({
  expense,
  onSubmit,
  onCancel,
  isLoading,
  isFixed,
}: ExpenseDialogContentProps) {
  const isEditing = !!expense;
  const { filters } = useExpenseFilters();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: expense?.name ?? "",
      value: expense?.value ?? 0,
    },
  });

  const handleFormSubmit = async (data: ExpenseFormData) => {
    const day = new Date(filters.month ?? 0, filters.year ?? 0).toISOString();
    await onSubmit({ ...data, isFixed, day });
  };

  const typeText = isFixed ? "fixa" : "variável";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <UIInput
          id="name"
          type="text"
          label="Nome da Despesa *"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
          placeholder={`Digite o nome da despesa ${typeText}`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <Controller
        control={control}
        name="value"
        render={({ field }) => {
          const { onChange, value } = field;
          const formatedValue = formatCurrency(value);
          return (
            <div>
              <UIInput
                id="value"
                label="Valor (R$) *"
                {...field}
                value={formatedValue}
                onChange={(e) =>
                  onChange(Number(removeNonNumeric(e.target.value)))
                }
                className={errors.value ? "border-red-500" : ""}
                placeholder="0,00"
              />
              {errors.value && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.value.message}
                </p>
              )}
            </div>
          );
        }}
      />

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
        </Button>
      </DialogFooter>
    </form>
  );
}
