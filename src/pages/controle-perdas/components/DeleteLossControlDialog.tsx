import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { Loading } from '~/components/ui/loading'
import { useDeleteLossControlMutation } from '~/hooks/loss-control/useDeleteLossControlMutation'
import type { LossControl } from '~/types/loss-control'
import { formatCurrency } from '~/utils/formaters'

interface DeleteLossControlDialogProps {
    lossControl: LossControl
}

export function DeleteLossControlDialog({ lossControl }: DeleteLossControlDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteLossControl, isPending: isDeleting } = useDeleteLossControlMutation()

    const handleDelete = async () => {
        await deleteLossControl(lossControl.id)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="size-4" />
                    Excluir
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Perda</DialogTitle>
                    <DialogDescription>
                        Tem certeza de que deseja excluir a perda do produto <strong>{lossControl.productName}</strong>
                        no valor de <strong>{formatCurrency(lossControl.totalValue)}</strong>?
                        Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting && <Loading className="w-4 h-4 mr-2" />}
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 