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
import { useUpdateBoletoMutation } from '~/hooks/boletos/useUpdateBoletoMutation'
import type { Boleto, CreateBoletoData } from '~/types/boleto'
import { BoletoDialogContent } from './BoletoDialogContent'

interface EditBoletoDialogProps {
    boleto: Boleto
}

export function EditBoletoDialog({ boleto }: EditBoletoDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateBoleto, isPending: isUpdating } = useUpdateBoletoMutation()

    const handleSubmit = async (data: CreateBoletoData) => {
        await updateBoleto({ id: boleto.id, data })
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Boleto</DialogTitle>
                </DialogHeader>
                <BoletoDialogContent
                    boleto={boleto}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                />
            </DialogContent>
        </Dialog>
    )
} 