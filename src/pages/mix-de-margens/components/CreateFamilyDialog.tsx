import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useCreateFamilyMutation } from "~/hooks/families/useCreateFamilyMutation";
import { useFamilies } from "~/hooks/families/useFamilies";
import type { FamilyFormData } from "~/schema/family";
import { FamilyDialogContent } from "./FamilyDialogContent";

export function CreateFamilyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { createFamily, isPending: isCreating } = useCreateFamilyMutation();
  const { families } = useFamilies();

  const handleSubmit = async (data: FamilyFormData) => {
    await createFamily({
      ...data,
      profitParticipation: data.profitParticipation ?? 0,
      profitMargin: data.profitMargin ?? 0,
      coefficient: data.coefficient ?? 0,
      contribution: data.contribution ?? 0,
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const totalProfitParticipation = families.reduce(
    (acc, family) => acc + family.profitParticipation,
    0
  );
  const disabledButton = totalProfitParticipation >= 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" disabled={disabledButton}>
          <Plus className="size-4" />
          Nova Família
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Família</DialogTitle>
        </DialogHeader>
        <FamilyDialogContent
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isCreating}
        />
      </DialogContent>
    </Dialog>
  );
}
