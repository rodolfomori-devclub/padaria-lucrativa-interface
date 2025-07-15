import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { TableEmptyState } from "~/components/Table/EmptyState";
import { TableSkeleton } from "~/components/Table/Skeleton";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useSalesProjectionFilters } from "~/hooks/filters/sales-projection-filters";
import { useSalesProjection } from "~/hooks/sales-projection/useSalesProjection";
import {
  salesProjectionSchema,
  type SalesProjectionFormData,
} from "~/schema/sales-projection";

export function SalesProjectionTable() {
  const { filters } = useSalesProjectionFilters();
  const {
    dayProjections,
    isLoading,
    isSaving,
    batchUpdateProjections,
  } = useSalesProjection(filters);

  // Initialize form with current data
  const initialData = useMemo(
    () => ({
      projections: dayProjections.map((proj) => ({
        day: proj.day,
        salesValue: proj.salesValue,
        purchaseValue: proj.purchaseValue,
      })),
    }),
    [dayProjections]
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SalesProjectionFormData>({
    resolver: zodResolver(salesProjectionSchema),
    defaultValues: initialData,
    values: initialData, // This ensures form updates when data changes
  });

  const { fields } = useFieldArray({
    control,
    name: "projections",
  });

  const onSubmit = async (data: SalesProjectionFormData) => {
    try {
      // Filter out only the changed projections for efficiency
      const changedProjections = data.projections.filter((projection) => {
        const originalProjection = dayProjections.find(
          (p) => p.day === projection.day
        );
        if (!originalProjection) return true; // New projection

        return (
          originalProjection.salesValue !== projection.salesValue ||
          originalProjection.purchaseValue !== projection.purchaseValue
        );
      });

      if (changedProjections.length > 0) {
        await batchUpdateProjections(changedProjections);
      }
    } catch (error) {
      console.error("Error saving projections:", error);
    }
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (dayProjections.length === 0) {
    return (
      <TableEmptyState
        title="Nenhuma projeção encontrada"
        description="Selecione um mês e ano para visualizar as projeções."
      />
    );
  }

  const monthName = filters.month
    ? new Date(2024, filters.month - 1)
      .toLocaleString("pt-BR", {
        month: "long",
      })
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    : "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Projeção de Vendas - {monthName} {filters.year}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Digite os valores de vendas e compras para cada dia do mês
              </p>
            </div>
            <Button
              type="submit"
              disabled={!isDirty || isSaving}
              className="min-w-24"
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Dia</TableHead>
              <TableHead>Vendas (R$)</TableHead>
              <TableHead>Compras (R$)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              const dayNumber = dayProjections[index]?.dayNumber || index + 1;

              return (
                <TableRow key={field.id}>
                  <input
                    type="hidden"
                    {...register(`projections.${index}.day`)}
                  />
                  <TableCell className="font-medium text-center">
                    {dayNumber}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0,00"
                      {...register(`projections.${index}.salesValue`, {
                        valueAsNumber: true,
                      })}
                      className={
                        errors.projections?.[index]?.salesValue
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.projections?.[index]?.salesValue && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.projections[index]?.salesValue?.message}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0,00"
                      {...register(`projections.${index}.purchaseValue`, {
                        valueAsNumber: true,
                      })}
                      className={
                        errors.projections?.[index]?.purchaseValue
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.projections?.[index]?.purchaseValue && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.projections[index]?.purchaseValue?.message}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </form>
  );
}
