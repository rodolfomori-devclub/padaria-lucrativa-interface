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
import { useUpdateEmployeeMutation } from '~/hooks/admin/funcionarios'
import type { CreateEmployeeFormData } from '~/schema/employee'
import type { User } from '~/types/user'
import { EmployeeDialogContent } from './EmployeeDialogContent'

interface EditEmployeeDialogProps {
    employee: User
}

export function EditEmployeeDialog({ employee }: EditEmployeeDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateEmployee, isPending: isUpdating } = useUpdateEmployeeMutation()

    const handleSubmit = async (data: CreateEmployeeFormData) => {
        await updateEmployee({ id: employee.id, data })
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                    <Edit className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Funcionário</DialogTitle>
                </DialogHeader>
                <EmployeeDialogContent
                    employee={employee}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                />
            </DialogContent>
        </Dialog>
    )
}
