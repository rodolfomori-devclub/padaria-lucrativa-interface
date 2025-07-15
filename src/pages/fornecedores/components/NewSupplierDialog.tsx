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
import { useCreateSupplierMutation } from '~/hooks/suppliers/useCreateSupplierMutation'
import type { CreateSupplierData } from '~/types/supplier'
import { SupplierDialogContent } from './SupplierDialogContent'

export function NewSupplierDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { createSupplier, isPending: isCreating } = useCreateSupplierMutation()

    const handleSubmit = async (data: CreateSupplierData) => {
        await createSupplier(data)
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
                    Novo Fornecedor
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Novo Fornecedor</DialogTitle>
                </DialogHeader>
                <SupplierDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
} 