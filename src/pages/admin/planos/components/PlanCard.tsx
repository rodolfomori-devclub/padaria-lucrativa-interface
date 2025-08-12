import { Edit2, Trash2, Users } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { Plan } from '~/types/plan'
import { formatCurrency } from '~/utils/formaters'

interface PlanCardProps {
    plan: Plan
    onEdit: (plan: Plan) => void
    onDelete: (plan: Plan) => void
}

export function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${plan.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {plan.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${plan.type === 'PRO'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {plan.type}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(plan)}
                        className="h-8 w-8 p-0"
                    >
                        <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(plan)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                {plan.description && (
                    <p className="text-sm text-gray-600">{plan.description}</p>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(plan.price)}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{plan.usersCount} clientes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
