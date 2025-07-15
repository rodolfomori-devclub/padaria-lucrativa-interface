import { AlertTriangle, Trash } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { useDeleteInputMutation } from '~/hooks/inputs/useDeleteInputMutation'
import type { Input } from '~/types/input'

interface DeleteInputDialogProps {
    input: Input
}

export function DeleteInputDialog({ input }: DeleteInputDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteInput, isPending: isDeleting } = useDeleteInputMutation()

    const handleConfirm = async () => {
        try {
            await deleteInput(input.id)
            setIsOpen(false)
        } catch (error) {
            console.error('Error deleting input:', error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-destructive">
                    <Trash className="size-4" />
                    Excluir
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle>Excluir Insumo</DialogTitle>
                            <DialogDescription className="mt-1">
                                Tem certeza que deseja excluir o insumo <span className="font-medium">"{input.name}"</span>?
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-3">
                    <p className="text-sm text-gray-500">
                        Esta ação não pode ser desfeita. O insumo será desativado e não aparecerá mais nas listagens.
                    </p>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    >
                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 