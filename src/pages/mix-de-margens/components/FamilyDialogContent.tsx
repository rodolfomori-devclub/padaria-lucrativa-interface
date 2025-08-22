import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { familySchema, type FamilyFormData } from "~/schema/family";
import type { Family } from "~/types/family";
import { getCoefficient, getContribution } from "~/utils/formaters";

interface FamilyDialogContentProps {
  onSubmit: (data: FamilyFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  family?: Family;
}

export function FamilyDialogContent({
  onSubmit,
  onCancel,
  isLoading,
  family,
}: FamilyDialogContentProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FamilyFormData>({
    resolver: zodResolver(familySchema),
    defaultValues: family
      ? {
          name: family.name,
          profitParticipation: family.profitParticipation,
          profitMargin: family.profitMargin,
          coefficient: family.coefficient,
        }
      : {
          name: "",
          profitParticipation: undefined,
          profitMargin: undefined,
          coefficient: undefined,
        },
  });

  const handleFormSubmit = async (data: FamilyFormData) => {
    await onSubmit(data);
  };

  const margin = watch("profitMargin");
  const participation = watch("profitParticipation");
  const coefficient = watch("coefficient");
  const contribution = watch("contribution");

  useEffect(() => {
    if (margin && participation) {
      setValue("coefficient", Number(getCoefficient(margin)));
      setValue(
        "contribution",
        Number(getContribution({ participation, margin }))
      );
    }
  }, [margin, participation, setValue]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Input
          id="name"
          label="Nome da Família *"
          placeholder="Ex: Pães Especiais"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Controller
            control={control}
            name="profitParticipation"
            render={({ field }) => {
              return (
                <Input
                  id="profitParticipation"
                  label="Participação no Lucro (%) *"
                  type="number"
                  {...field}
                  placeholder="25,00"
                  className={errors.profitParticipation ? "border-red-500" : ""}
                  disabled={isLoading}
                />
              );
            }}
          />
          {errors.profitParticipation && (
            <p className="mt-1 text-sm text-red-600">
              {errors.profitParticipation.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="profitMargin"
            render={({ field }) => {
              return (
                <Input
                  id="profitMargin"
                  label="Margem de Lucro (%) *"
                  type="number"
                  {...field}
                  placeholder="35,00"
                  className={errors.profitMargin ? "border-red-500" : ""}
                  disabled={isLoading}
                />
              );
            }}
          />
          {errors.profitMargin && (
            <p className="mt-1 text-sm text-red-600">
              {errors.profitMargin.message}
            </p>
          )}
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <p className="text-sm font-medium">Coeficiente: </p>
          {coefficient && (
            <span className="font-semibold text-right text-2xl">
              {coefficient + " x"}
            </span>
          )}
        </div>

        <div className="w-full flex justify-between">
          <p className="text-sm font-medium">Contribuição: </p>
          {contribution && (
            <span className="font-semibold text-right text-2xl">
              {contribution + " %"}
            </span>
          )}
        </div>
      </div>

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
          {isLoading ? "Salvando..." : family ? "Atualizar" : "Criar"}
        </Button>
      </DialogFooter>
    </form>
  );
}
