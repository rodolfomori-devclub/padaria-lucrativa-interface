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
import { useCreateEmployeeMutation } from '~/hooks/admin/funcionarios'
import type { CreateEmployeeFormData } from '~/schema/employee'
import { EmployeeDialogContent } from './EmployeeDialogContent'

export function CreateEmployeeDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { createEmployee, isPending: isCreating } = useCreateEmployeeMutation()

    const handleSubmit = async (data: CreateEmployeeFormData) => {
        await createEmployee(data as CreateEmployeeFormData)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="size-4" />
                    Novo Funcionário
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Criar Novo Funcionário</DialogTitle>
                </DialogHeader>
                <EmployeeDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
}
