import { Edit } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { useUpdateExpenseMutation } from '~/hooks/expenses/useUpdateExpenseMutation'
import type { CreateExpenseData, Expense } from '~/types/expense'
import { ExpenseDialogContent } from './ExpenseDialogContent'

interface EditExpenseDialogProps {
    expense: Expense
}

export function EditExpenseDialog({ expense }: EditExpenseDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateExpense, isPending: isUpdating } = useUpdateExpenseMutation()

    const handleSubmit = async (data: CreateExpenseData) => {
        await updateExpense({ id: expense.id, data })
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                    <Edit className="size-4" />
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Despesa</DialogTitle>
                </DialogHeader>
                <ExpenseDialogContent
                    expense={expense}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                    isFixed={expense.isFixed}
                />
            </DialogContent>
        </Dialog>
    )
} 