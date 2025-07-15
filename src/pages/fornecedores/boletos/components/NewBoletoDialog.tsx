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
import { useCreateBoletoMutation } from '~/hooks/boletos/useCreateBoletoMutation'
import type { CreateBoletoData } from '~/types/boleto'
import { BoletoDialogContent } from './BoletoDialogContent'

export function NewBoletoDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { createBoleto, isPending: isCreating } = useCreateBoletoMutation()

    const handleSubmit = async (data: CreateBoletoData) => {
        await createBoleto(data)
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
                    Novo Boleto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Novo Boleto</DialogTitle>
                </DialogHeader>
                <BoletoDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
} 