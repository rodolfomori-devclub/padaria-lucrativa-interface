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
import { useUpdateClientMutation } from '~/hooks/admin/clientes'
import type { UpdateClientData } from '~/types/client'
import type { User } from '~/types/user'
import { ClientDialogContent } from './ClientDialogContent'

interface EditClientDialogProps {
    client: User
}

export function EditClientDialog({ client }: EditClientDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { updateClient, isPending: isUpdating } = useUpdateClientMutation()

    const handleSubmit = async (data: UpdateClientData) => {
        await updateClient({ id: client.id, data })
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
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Cliente</DialogTitle>
                </DialogHeader>
                <ClientDialogContent
                    client={client}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                />
            </DialogContent>
        </Dialog>
    )
}
