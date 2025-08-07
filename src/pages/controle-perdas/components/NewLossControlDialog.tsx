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
import { useCreateLossControlMutation } from '~/hooks/loss-control/useCreateLossControlMutation'
import type { CreateLossControlData } from '~/types/loss-control'
import { LossControlDialogContent } from './LossControlDialogContent'

export function NewLossControlDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { createLossControl, isPending: isCreating } = useCreateLossControlMutation()

    const handleSubmit = async ({ recipeId, unitPrice, quantity, observations, day, productName }: CreateLossControlData) => {
        await createLossControl({
            recipeId,
            unitPrice,
            quantity,
            observations,
            day,
            productName,
        })
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
                    Nova Perda
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Registrar Nova Perda</DialogTitle>
                </DialogHeader>
                <LossControlDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
} 