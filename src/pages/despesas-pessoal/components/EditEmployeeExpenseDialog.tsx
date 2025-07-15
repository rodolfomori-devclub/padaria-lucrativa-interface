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
import { useUpdateEmployeeExpenseMutation } from '~/hooks/employee-expenses/useUpdateEmployeeExpenseMutation'
import type { EmployeeExpense, UpdateEmployeeExpenseData } from '~/types/employee-expense'
import { EmployeeExpenseDialogContent } from './EmployeeExpenseDialogContent'

interface EditEmployeeExpenseDialogProps {
    employeeExpense: EmployeeExpense
}

export function EditEmployeeExpenseDialog({ employeeExpense }: EditEmployeeExpenseDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateEmployeeExpense, isPending: isUpdating } = useUpdateEmployeeExpenseMutation()

    const handleSubmit = async (data: UpdateEmployeeExpenseData) => {
        await updateEmployeeExpense({ id: employeeExpense.id, data })
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
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Editar Despesa com Pessoal</DialogTitle>
                </DialogHeader>
                <EmployeeExpenseDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                    initialData={employeeExpense}
                />
            </DialogContent>
        </Dialog>
    )
} 