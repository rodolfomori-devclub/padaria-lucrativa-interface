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
    DialogTrigger,
} from '~/components/ui/dialog'
import { useDeleteExpenseMutation } from '~/hooks/expenses/useDeleteExpenseMutation'
import type { Expense } from '~/types/expense'

interface DeleteExpenseDialogProps {
    expense: Expense
}

export function DeleteExpenseDialog({ expense }: DeleteExpenseDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteExpense, isPending: isDeleting } = useDeleteExpenseMutation()
    const isRecurring = !!expense.recurringTemplateId

    const handleDelete = async () => {
        await deleteExpense(expense.id)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive gap-1">
                    <Trash2 className="size-4" />
                    Remover
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Remover Despesa</DialogTitle>
                    <DialogDescription asChild>
                        <div className="space-y-3">
                            {isRecurring ? (
                                <>
                                    <p className="font-semibold text-amber-600">
                                        ⚠️ Esta é uma despesa recorrente!
                                    </p>
                                    <p>
                                        Ao remover esta despesa, <strong>todas as ocorrências futuras desta recorrência serão excluídas</strong> e o template recorrente será desativado.
                                    </p>
                                    <p>
                                        Deseja realmente remover a despesa "{expense.name}" e todas as suas ocorrências futuras?
                                    </p>
                                </>
                            ) : (
                                <p>
                                    Tem certeza que deseja remover a despesa "{expense.name}"? Esta ação não pode ser desfeita.
                                </p>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Removendo...' : 'Remover'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 