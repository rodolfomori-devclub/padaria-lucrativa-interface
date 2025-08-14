import { useState } from 'react'
import { Loading } from '~/components/ui/loading'
import { usePlans } from '~/hooks/plans'
import type { Plan } from '~/types/plan'
import {
    DeletePlanDialog,
    EditPlanDialog,
    NewPlanDialog,
    PlanCard,
} from './components'

export function PlansPage() {
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
    const [deletingPlan, setDeletingPlan] = useState<Plan | null>(null)

    const { data: plans = [], isLoading } = usePlans()

    const handleEdit = (plan: Plan) => {
        setEditingPlan(plan)
    }

    const handleDelete = (plan: Plan) => {
        setDeletingPlan(plan)
    }

    const handleCloseEditDialog = () => {
        setEditingPlan(null)
    }

    const handleCloseDeleteDialog = () => {
        setDeletingPlan(null)
    }

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-center h-64">
                    <Loading className="h-8 w-8" />
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="p-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Planos</h1>
                            <p className="text-gray-600 mt-2">Gerencie os planos de assinatura do sistema</p>
                        </div>
                        <NewPlanDialog />
                    </div>
                </div>

                {plans.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Nenhum plano cadastrado</p>
                        <p className="text-gray-400 text-sm mt-2">Comece criando seu primeiro plano</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            <EditPlanDialog
                plan={editingPlan}
                isOpen={!!editingPlan}
                onClose={handleCloseEditDialog}
            />

            <DeletePlanDialog
                plan={deletingPlan}
                isOpen={!!deletingPlan}
                onClose={handleCloseDeleteDialog}
            />
        </>
    )
}