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
import { useUpdateSupplierMutation } from '~/hooks/suppliers/useUpdateSupplierMutation'
import type { CreateSupplierData, Supplier } from '~/types/supplier'
import { SupplierDialogContent } from './SupplierDialogContent'

interface EditSupplierDialogProps {
    supplier: Supplier
}

export function EditSupplierDialog({ supplier }: EditSupplierDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateSupplier, isPending: isUpdating } = useUpdateSupplierMutation()

    const handleSubmit = async (data: CreateSupplierData) => {
        await updateSupplier({ id: supplier.id, data })
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
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Fornecedor</DialogTitle>
                </DialogHeader>
                <SupplierDialogContent
                    supplier={supplier}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                />
            </DialogContent>
        </Dialog>
    )
} 