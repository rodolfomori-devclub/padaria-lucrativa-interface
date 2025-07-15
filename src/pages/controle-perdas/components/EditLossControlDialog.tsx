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
import { useUpdateLossControlMutation } from '~/hooks/loss-control/useUpdateLossControlMutation'
import type { CreateLossControlData, LossControl } from '~/types/loss-control'
import { LossControlDialogContent } from './LossControlDialogContent'

interface EditLossControlDialogProps {
    lossControl: LossControl
}

export function EditLossControlDialog({ lossControl }: EditLossControlDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateLossControl, isPending: isUpdating } = useUpdateLossControlMutation()

    const handleSubmit = async ({ productName, unitPrice, quantity, observations }: CreateLossControlData) => {
        await updateLossControl({ id: lossControl.id, data: { productName, unitPrice, quantity, observations } })
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
                    <DialogTitle>Editar Perda</DialogTitle>
                </DialogHeader>
                <LossControlDialogContent
                    lossControl={lossControl}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                />
            </DialogContent>
        </Dialog>
    )
} 