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
import { useUpdateInputMutation } from '~/hooks/inputs/useUpdateInputMutation'
import type { Input, UpdateInputData } from '~/types/input'
import { InputDialogContent } from './InputDialogContent'

interface EditInputDialogProps {
    input: Input
}

export function EditInputDialog({ input }: EditInputDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateInput, isPending: isUpdating } = useUpdateInputMutation()

    const handleSubmit = async (data: UpdateInputData) => {
        await updateInput({ id: input.id, data })
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Edit className="size-4" />
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Insumo</DialogTitle>
                </DialogHeader>
                <InputDialogContent
                    input={input}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                />
            </DialogContent>
        </Dialog>
    )
} 