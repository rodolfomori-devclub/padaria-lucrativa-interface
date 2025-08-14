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
import { useCreatePlanMutation } from '~/hooks/plans'
import type { CreatePlanData } from '~/types/plan'
import { PlanDialogContent } from './PlanDialogContent'

export function NewPlanDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const { mutateAsync: createPlan, isPending: isCreating } = useCreatePlanMutation()

    const handleSubmit = async (data: CreatePlanData) => {
        await createPlan(data)
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
                    Novo Plano
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Novo Plano</DialogTitle>
                </DialogHeader>
                <PlanDialogContent
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isCreating}
                />
            </DialogContent>
        </Dialog>
    )
}
