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
import { useCreateClientMutation } from '~/hooks/admin/clientes'
import type { CreateClientData, UpdateClientData } from '~/types/client'
import { ClientDialogContent } from './ClientDialogContent'

export function CreateClientDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { createClient, isPending: isCreating } = useCreateClientMutation()

    const handleSubmit = async (data: CreateClientData | UpdateClientData) => {
        await createClient(data as CreateClientData)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="size-4" />
                    Novo Cliente
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Criar Novo Cliente</DialogTitle>
                </DialogHeader>
                <ClientDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
}
