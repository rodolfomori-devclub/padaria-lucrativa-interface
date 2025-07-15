import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog'
import { useRecipes } from '~/hooks/recipes/useRecipes'
import type { Recipe } from '~/types/recipe'

interface DeleteRecipeDialogProps {
    recipe: Recipe
}

export const DeleteRecipeDialog = ({ recipe }: DeleteRecipeDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteRecipe, isDeleting } = useRecipes()

    const handleDelete = async () => {
        await deleteRecipe(recipe.id)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setIsOpen(true)}
            >
                <Trash2 className="h-3 w-3" />
                Excluir
            </Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir a receita "{recipe.name}"?
                        Esta ação não poderá ser desfeita.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 