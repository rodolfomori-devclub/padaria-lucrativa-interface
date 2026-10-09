import { MailPlus } from 'lucide-react'
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
import { useResendClientAccessMutation } from '~/hooks/admin/clientes'
import type { User } from '~/types/user'

interface ResendAccessDialogProps {
    client: Pick<User, 'id' | 'email'>
    onResent?: () => void
    /** Mostra o texto ao lado do ícone (a tabela de clientes usa só o ícone). */
    showLabel?: boolean
}

export function ResendAccessDialog({ client, onResent, showLabel }: ResendAccessDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { resendAccess, isPending } = useResendClientAccessMutation()

    const handleResend = async () => {
        await resendAccess(client.id)
        setIsOpen(false)
        onResent?.()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    title="Reenviar link de acesso"
                >
                    <MailPlus className="size-4" />
                    {showLabel && 'Reenviar link de acesso'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reenviar link de acesso</DialogTitle>
                    <DialogDescription className='text-md text-center p-4'>
                        Enviar um novo e-mail para <strong>{client.email}</strong> com o link
                        para definir a senha? O link anterior deixa de ser necessário e o novo
                        vale por 7 dias.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleResend}
                        disabled={isPending}
                    >
                        {isPending && <Loading className="w-4 h-4 mr-2" />}
                        Reenviar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
