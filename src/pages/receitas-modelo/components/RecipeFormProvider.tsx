import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  recipeFormSchema,
  type RecipeFormData,
} from "~/schema/receitas-modelo";
import { UnitMeasure } from "~/types/input";
import type { Recipe } from "~/types/recipe";

interface RecipeFormProviderProps {
  children: ReactNode;
  defaultValues?: Recipe | null;
  onSubmit: (data: RecipeFormData) => Promise<void>;
}

export const RecipeFormProvider = ({
  children,
  defaultValues,
  onSubmit,
}: RecipeFormProviderProps) => {
  const methods = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      yield: defaultValues?.yield ?? 1,
      unitMeasure: defaultValues?.unitMeasure ?? UnitMeasure.UNIDADE,
      inputs: defaultValues?.inputs ?? [],
      salePrice: defaultValues?.salePrice ?? 0,
      familyId: defaultValues?.familyId ?? undefined,
    },
  });

  const handleSubmit = async (data: RecipeFormData) => {
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
        {children}
      </form>
    </FormProvider>
  );
};
