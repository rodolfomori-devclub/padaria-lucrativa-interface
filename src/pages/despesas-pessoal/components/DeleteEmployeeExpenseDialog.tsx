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
import { useDeleteEmployeeExpenseMutation } from '~/hooks/employee-expenses/useDeleteEmployeeExpenseMutation'
import type { EmployeeExpense } from '~/types/employee-expense'

interface DeleteEmployeeExpenseDialogProps {
    employeeExpense: EmployeeExpense
}

export function DeleteEmployeeExpenseDialog({ employeeExpense }: DeleteEmployeeExpenseDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteEmployeeExpense, isPending: isDeleting } = useDeleteEmployeeExpenseMutation()
    const isRecurring = !!employeeExpense.recurringTemplateId

    const handleDelete = async () => {
        await deleteEmployeeExpense(employeeExpense.id)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-destructive">
                    <Trash2 className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Despesa com Pessoal</DialogTitle>
                    <DialogDescription>
                        {isRecurring ? (
                            <div className="space-y-2">
                                <p className="font-semibold text-amber-600">
                                    ⚠️ Este é um funcionário recorrente!
                                </p>
                                <p>
                                    Ao remover este funcionário, <strong>todas as folhas de pagamento futuras
                                    serão excluídas</strong> e o cadastro recorrente será desativado.
                                </p>
                                <p className="mt-2">
                                    Deseja realmente remover "{employeeExpense.name}" e todas as suas ocorrências futuras?
                                </p>
                            </div>
                        ) : (
                            `Tem certeza que deseja excluir a despesa do funcionário "${employeeExpense.name}"? Esta ação não pode ser desfeita.`
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 