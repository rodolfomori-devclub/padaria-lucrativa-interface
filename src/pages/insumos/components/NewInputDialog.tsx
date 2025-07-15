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
import { useCreateInputMutation } from '~/hooks/inputs/useCreateInputMutation'
import type { CreateInputData } from '~/types/input'
import { InputDialogContent } from './InputDialogContent'

export function NewInputDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { createInput, isPending: isCreating } = useCreateInputMutation()

    const handleSubmit = async (data: CreateInputData) => {
        await createInput(data)
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
                    Novo Insumo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Novo Insumo</DialogTitle>
                </DialogHeader>
                <InputDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
} 