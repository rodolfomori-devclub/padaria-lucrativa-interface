import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { useCreateExpenseMutation } from '~/hooks/expenses/useCreateExpenseMutation'
import type { CreateExpenseData } from '~/types/expense'
import { ExpenseDialogContent } from './ExpenseDialogContent'

interface NewExpenseDialogProps {
    isFixed: boolean
}

export function NewExpenseDialog({ isFixed }: NewExpenseDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { createExpense, isPending: isCreating } = useCreateExpenseMutation()

    const handleSubmit = async (data: CreateExpenseData) => {
        await createExpense(data)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const typeText = isFixed ? 'Fixa' : 'Variável'

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Despesa {typeText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Nova Despesa {typeText}</DialogTitle>
                </DialogHeader>
                <ExpenseDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                    isFixed={isFixed}
                />
            </DialogContent>
        </Dialog>
    )
} 