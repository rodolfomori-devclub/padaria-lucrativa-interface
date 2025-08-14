import { AlertTriangle } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog'
import { useDeletePlanMutation } from '~/hooks/plans'
import type { Plan } from '~/types/plan'

interface DeletePlanDialogProps {
    plan: Plan | null
    isOpen: boolean
    onClose: () => void
}

export function DeletePlanDialog({ plan, isOpen, onClose }: DeletePlanDialogProps) {
    const { mutateAsync: deletePlan, isPending: isDeleting } = useDeletePlanMutation()

    const handleDelete = async () => {
        if (!plan) return

        await deletePlan(plan.id)
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }

    if (!plan) return null

    const hasUsers = plan.usersCount > 0

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        Excluir Plano
                    </DialogTitle>
                    <DialogDescription>
                        {hasUsers ? (
                            <div className="space-y-2">
                                <p>
                                    <strong>Atenção!</strong> Este plano possui {plan.usersCount} usuário(s) vinculado(s).
                                </p>
                                <p>
                                    Não é possível excluir um plano que possui usuários.
                                    Primeiro, reassine os usuários para outro plano.
                                </p>
                            </div>
                        ) : (
                            <p>
                                Tem certeza que deseja excluir o plano <strong>"{plan.title}"</strong>?
                                Esta ação não pode ser desfeita.
                            </p>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>
                    {!hasUsers && (
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Excluindo...' : 'Excluir'}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
