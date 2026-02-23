import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useJobs } from "~/hooks/jobs/useJobs";
import {
  employeeExpenseSchema,
  type EmployeeExpenseFormData,
} from "~/schema/employee-expenses";
import type {
  CreateEmployeeExpenseData,
  EmployeeExpense,
  UpdateEmployeeExpenseData,
} from "~/types/employee-expense";
import { formatCurrency, removeNonNumeric } from "~/utils/formaters";

interface EmployeeExpenseDialogContentProps {
  onSubmit: (
    data: CreateEmployeeExpenseData | UpdateEmployeeExpenseData
  ) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: EmployeeExpense;
}

export function EmployeeExpenseDialogContent({
  onSubmit,
  onCancel,
  isLoading,
  initialData,
}: EmployeeExpenseDialogContentProps) {
  const { jobs } = useJobs();
  const [isRecurring, setIsRecurring] = useState(!!initialData?.recurringTemplateId);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EmployeeExpenseFormData>({
    resolver: zodResolver(employeeExpenseSchema),
    defaultValues: {
      name: initialData?.name || undefined,
      jobId: initialData?.jobId || undefined,
      baseSalary: initialData?.baseSalary || undefined,
      extraHours: initialData?.extraHours || undefined,
      transport: initialData?.transport || undefined,
      meal: initialData?.meal || undefined,
      isRecurring: !!initialData?.recurringTemplateId,
    },
  });

  const handleFormSubmit = async (data: EmployeeExpenseFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            id="name"
            label="Nome do Funcionário"
            placeholder="Ex: João Silva"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="jobId">Cargo</Label>
          <Select
            onValueChange={(value) => setValue("jobId", value)}
            defaultValue={initialData?.jobId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um cargo" />
            </SelectTrigger>
            <SelectContent>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.jobId && (
            <p className="text-sm text-red-600 mt-1">{errors.jobId.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Controller
            control={control}
            name="baseSalary"
            render={({ field }) => {
              const { onChange, value, ...rest } = field;
              const formattedValue = formatCurrency(value);
              return (
                <Input
                  id="baseSalary"
                  label="Salário Base"
                  placeholder="R$ 0,00"
                  value={formattedValue}
                  onChange={(e) =>
                    onChange(Number(removeNonNumeric(e.target.value)))
                  }
                  {...rest}
                />
              );
            }}
          />
          {errors.baseSalary && (
            <p className="text-sm text-red-600 mt-1">
              {errors.baseSalary.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="extraHours"
            render={({ field }) => {
              const { onChange, value, ...rest } = field;
              const formattedValue = formatCurrency(value);
              return (
                <Input
                  id="extraHours"
                  label="Horas Extras"
                  placeholder="R$ 0,00"
                  value={formattedValue}
                  onChange={(e) =>
                    onChange(Number(removeNonNumeric(e.target.value)))
                  }
                  {...rest}
                />
              );
            }}
          />
          {errors.extraHours && (
            <p className="text-sm text-red-600 mt-1">
              {errors.extraHours.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="meal"
          render={({ field }) => {
            const { onChange, value, ...rest } = field;
            const formattedValue = formatCurrency(value);
            return (
              <Input
                id="meal"
                label="Vale Refeição"
                placeholder="R$ 0,00"
                value={formattedValue}
                onChange={(e) =>
                  onChange(Number(removeNonNumeric(e.target.value)))
                }
                {...rest}
              />
            );
          }}
        />
        {errors.meal && (
          <p className="text-sm text-red-600 mt-1">{errors.meal.message}</p>
        )}
        <div>
          <Controller
            control={control}
            name="transport"
            render={({ field }) => {
              const { onChange, value, ...rest } = field;
              const formattedValue = formatCurrency(value);
              return (
                <Input
                  id="transport"
                  label="Vale Transporte"
                  placeholder="R$ 0,00"
                  value={formattedValue}
                  onChange={(e) =>
                    onChange(Number(removeNonNumeric(e.target.value)))
                  }
                  {...rest}
                />
              );
            }}
          />
          {errors.transport && (
            <p className="text-sm text-red-600 mt-1">
              {errors.transport.message}
            </p>
          )}
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex items-center gap-2 mb-4">
          <Switch
            id="isRecurring"
            checked={isRecurring}
            onCheckedChange={(checked) => {
              setIsRecurring(checked);
              setValue("isRecurring", checked);
            }}
            disabled={!!initialData}
          />
          <Label htmlFor="isRecurring">Funcionário Recorrente (Salário Mensal)</Label>
        </div>

        {isRecurring && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
            <div>
              <Input
                id="recurringStartDate"
                label="Data de Início"
                type="date"
                {...register("recurringStartDate")}
              />
              {errors.recurringStartDate && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.recurringStartDate.message}
                </p>
              )}
            </div>
            <div>
              <Input
                id="recurringDayOfMonth"
                label="Dia do Pagamento"
                type="number"
                min="1"
                max="31"
                placeholder="Ex: 5 (dia 5 de cada mês)"
                {...register("recurringDayOfMonth", { valueAsNumber: true })}
              />
              {errors.recurringDayOfMonth && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.recurringDayOfMonth.message}
                </p>
              )}
            </div>
            <div className="col-span-2 text-sm text-blue-600">
              Este funcionário será gerado automaticamente todo mês a partir da data de início.
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : initialData ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
