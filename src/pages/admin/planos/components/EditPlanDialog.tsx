import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog'
import { useUpdatePlanMutation } from '~/hooks/plans'
import type { CreatePlanData, Plan } from '~/types/plan'
import { PlanDialogContent } from './PlanDialogContent'

interface EditPlanDialogProps {
    plan: Plan | null
    isOpen: boolean
    onClose: () => void
}

export function EditPlanDialog({ plan, isOpen, onClose }: EditPlanDialogProps) {
    const { mutateAsync: updatePlan, isPending: isUpdating } = useUpdatePlanMutation()

    const handleSubmit = async (data: CreatePlanData) => {
        if (!plan) return

        await updatePlan({ id: plan.id, data })
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }

    if (!plan) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Plano</DialogTitle>
                </DialogHeader>
                <PlanDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isUpdating}
                    initialData={plan}
                />
            </DialogContent>
        </Dialog>
    )
}
