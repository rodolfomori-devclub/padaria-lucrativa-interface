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
import { useCreateEmployeeExpenseMutation } from '~/hooks/employee-expenses/useCreateEmployeeExpenseMutation'
import type { CreateEmployeeExpenseData, UpdateEmployeeExpenseData } from '~/types/employee-expense'
import { EmployeeExpenseDialogContent } from './EmployeeExpenseDialogContent'

export function NewEmployeeExpenseDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { createEmployeeExpense, isPending: isCreating } = useCreateEmployeeExpenseMutation()

    const handleSubmit = async (data: CreateEmployeeExpenseData | UpdateEmployeeExpenseData) => {
        await createEmployeeExpense(data as CreateEmployeeExpenseData)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Despesa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Nova Despesa com Pessoal</DialogTitle>
                </DialogHeader>
                <EmployeeExpenseDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
} 