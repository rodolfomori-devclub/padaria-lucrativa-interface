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
import { useDeleteBoletoMutation } from '~/hooks/boletos/useDeleteBoletoMutation'
import type { Boleto } from '~/types/boleto'
import { formatCurrency } from '~/utils/formaters'

interface DeleteBoletoDialogProps {
    boleto: Boleto
}

export function DeleteBoletoDialog({ boleto }: DeleteBoletoDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { deleteBoleto, isPending: isDeleting } = useDeleteBoletoMutation()
    const isRecurring = !!boleto.recurringTemplateId

    const handleDelete = async () => {
        await deleteBoleto(boleto.id)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Excluir Boleto</DialogTitle>
                    <DialogDescription asChild>
                        <div className="space-y-3">
                            {isRecurring ? (
                                <>
                                    <p className="font-semibold text-amber-600">
                                        ⚠️ Este é um boleto recorrente!
                                    </p>
                                    <p>
                                        Ao remover este boleto, <strong>todas as ocorrências futuras desta recorrência serão excluídas</strong> e o template recorrente será desativado.
                                    </p>
                                    <p>
                                        Deseja realmente excluir o boleto de <strong>{boleto.supplier.name}</strong> no valor de <strong>{formatCurrency(boleto.value)}</strong> e todas as suas ocorrências futuras?
                                    </p>
                                </>
                            ) : (
                                <p>
                                    Tem certeza de que deseja excluir o boleto de <strong>{boleto.supplier.name}</strong> no valor de <strong>{formatCurrency(boleto.value)}</strong>? Esta ação não pode ser desfeita.
                                </p>
                            )}
                        </div>
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