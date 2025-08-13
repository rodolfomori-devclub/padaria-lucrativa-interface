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
import { useDeleteClientMutation } from '~/hooks/admin/clientes'
import type { User } from '~/types/user'

interface DeleteClientDialogProps {
    client: User
}

export function DeleteClientDialog({ client }: DeleteClientDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteClient, isPending: isDeleting } = useDeleteClientMutation()

    const handleDelete = async () => {
        await deleteClient(client.id)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Cliente</DialogTitle>
                    <DialogDescription className='text-md text-center p-4'>
                        Tem certeza de que deseja excluir o cliente <strong>{client.name}</strong>?
                        Esta ação não pode ser desfeita e o cliente será desativado do sistema.
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
