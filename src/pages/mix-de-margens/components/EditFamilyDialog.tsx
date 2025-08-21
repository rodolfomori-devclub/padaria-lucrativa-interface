import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useUpdateFamilyMutation } from "~/hooks/families/useUpdateFamilyMutation";
import type { FamilyFormData } from "~/schema/family";
import type { Family } from "~/types/family";
import { FamilyDialogContent } from "./FamilyDialogContent";

interface EditFamilyDialogProps {
  family: Family;
}

export function EditFamilyDialog({ family }: EditFamilyDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateFamily, isPending: isUpdating } = useUpdateFamilyMutation();

  const handleSubmit = async (data: FamilyFormData) => {
    await updateFamily({ id: family.id, data });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Edit className="h-3 w-3" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Família</DialogTitle>
        </DialogHeader>
        <FamilyDialogContent
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isUpdating}
          family={family}
        />
      </DialogContent>
    </Dialog>
  );
}
