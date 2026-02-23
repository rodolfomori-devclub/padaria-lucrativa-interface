import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label, Switch } from "~/components/ui";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Input as UIInput } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
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
    control,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: expense?.name ?? "",
      value: expense?.value ?? undefined,
      isGovFee: expense?.isGovFee ?? false,
      isRecurring: false,
      recurrencePattern: undefined,
      recurringStartDate: undefined,
      recurringDayOfMonth: undefined,
    },
  });

  const isRecurring = watch('isRecurring');

  const handleFormSubmit = async (data: ExpenseFormData) => {
    const day = new Date(filters.year ?? new Date().getFullYear(), (filters.month ?? 1) - 1, 1).toISOString();
    const isGovFee = data.isGovFee;
    
    const submitData: CreateExpenseData = {
      ...data,
      name: isGovFee ? "Simples Nacional" : data.name,
      isFixed,
      ...(!expense && { day }),
      isGovFee,
    };

    // Only include recurrency fields if isRecurring is true
    if (data.isRecurring) {
      submitData.isRecurring = true;
      submitData.recurrencePattern = data.recurrencePattern;
      submitData.recurringStartDate = data.recurringStartDate;
      submitData.recurringDayOfMonth = data.recurringDayOfMonth;
    }

    await onSubmit(submitData);
  };

  const typeText = isFixed ? "fixa" : "variável";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <UIInput
          label="Nome da Despesa *"
          id="name"
          type="text"
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
        name="isGovFee"
        render={({ field }) => {
          const { onChange, value, ...rest } = field;
          return (
            <div className="flex items-center gap-2 my-6">
              <Switch
                id="isGovFee"
                {...rest}
                checked={value}
                onCheckedChange={onChange}
              />
              <Label htmlFor="isGovFee">Simples Nacional</Label>
            </div>
          );
        }}
      />

      <Controller
        control={control}
        name="value"
        render={({ field }) => {
          const { onChange, value, ...rest } = field;
          const formattedValue = formatCurrency(value);
          return (
            <UIInput
              label="Valor (R$) *"
              id="value"
              placeholder="0,00"
              className={errors.value ? "border-red-500" : ""}
              {...rest}
              value={formattedValue}
              onChange={(e) =>
                onChange(Number(removeNonNumeric(e.target.value)))
              }
            />
          );
        }}
      />
      {errors.value && (
        <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
      )}

      {!isEditing && (
        <>
          <Controller
            control={control}
            name="isRecurring"
            render={({ field }) => {
              const { onChange, value, ...rest } = field;
              return (
                <div className="flex items-center gap-2 my-4">
                  <Switch
                    id="isRecurring"
                    {...rest}
                    checked={value}
                    onCheckedChange={onChange}
                  />
                  <Label htmlFor="isRecurring">Tornar recorrente</Label>
                </div>
              );
            }}
          />

          {isRecurring && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700">Configuração de Recorrência</h4>
              
              <Controller
                control={control}
                name="recurrencePattern"
                render={({ field }) => (
                  <div>
                    <Label htmlFor="recurrencePattern">Frequência *</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.recurrencePattern ? "border-red-500" : ""}>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MONTHLY">Mensal</SelectItem>
                        <SelectItem value="QUARTERLY">Trimestral (a cada 3 meses)</SelectItem>
                        <SelectItem value="SEMIANNUAL">Semestral (a cada 6 meses)</SelectItem>
                        <SelectItem value="ANNUAL">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.recurrencePattern && (
                      <p className="mt-1 text-sm text-red-600">{errors.recurrencePattern.message}</p>
                    )}
                  </div>
                )}
              />

              <div>
                <UIInput
                  label="Data de Início *"
                  id="recurringStartDate"
                  type="date"
                  {...register("recurringStartDate")}
                  className={errors.recurringStartDate ? "border-red-500" : ""}
                />
                {errors.recurringStartDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.recurringStartDate.message}</p>
                )}
              </div>

              <div>
                <UIInput
                  label="Dia do Mês (1-31) *"
                  id="recurringDayOfMonth"
                  type="number"
                  min="1"
                  max="31"
                  {...register("recurringDayOfMonth", { valueAsNumber: true })}
                  className={errors.recurringDayOfMonth ? "border-red-500" : ""}
                  placeholder="Ex: 5"
                />
                {errors.recurringDayOfMonth && (
                  <p className="mt-1 text-sm text-red-600">{errors.recurringDayOfMonth.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Dia do mês em que a despesa será gerada automaticamente
                </p>
              </div>
            </div>
          )}
        </>
      )}

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
