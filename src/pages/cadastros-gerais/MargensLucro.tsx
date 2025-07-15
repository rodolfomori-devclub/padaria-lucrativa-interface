import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Label } from "~/components/ui"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useCreateProfitMarginMutation } from "~/hooks/profit-margins/useCreateProfitMarginMutation"
import { useProfitMargins } from "~/hooks/profit-margins/useProfitMargins"
import { useUpdateProfitMarginMutation } from "~/hooks/profit-margins/useUpdateProfitMarginMutation"
import { profitMarginSchema, type ProfitMarginFormData } from "~/schema/profit-margin"

export function MargensLucroPage() {
    const { profitMargins, isLoading } = useProfitMargins()
    const { createProfitMargin, isPending: isCreating } = useCreateProfitMarginMutation()
    const { updateProfitMargin, isPending: isUpdating } = useUpdateProfitMarginMutation()

    // Get the active profit margin (there should typically be only one)
    const activeProfitMargin = profitMargins.find(pm => pm.isActive)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfitMarginFormData>({
        resolver: zodResolver(profitMarginSchema),
        defaultValues: {
            cardPercentage: 0,
            lossPercentage: 0,
            cardTaxPercentage: 0,
            breakagePercentage: 0,
            packagingPercentage: 0,
        },
    })

    // Update form when profit margin data is loaded
    useEffect(() => {
        if (activeProfitMargin) {
            reset({
                cardPercentage: activeProfitMargin.cardPercentage,
                lossPercentage: activeProfitMargin.lossPercentage,
                cardTaxPercentage: activeProfitMargin.cardTaxPercentage,
                breakagePercentage: activeProfitMargin.breakagePercentage,
                packagingPercentage: activeProfitMargin.packagingPercentage,
            })
        }
    }, [activeProfitMargin, reset])

    const onSubmit = async (data: ProfitMarginFormData) => {
        try {
            if (activeProfitMargin) {
                // Update existing
                await updateProfitMargin({
                    id: activeProfitMargin.id,
                    data,
                })
            } else {
                // Create new
                await createProfitMargin(data)
            }
        } catch {
            toast.error('Erro ao salvar configuração')
        }
    }

    const isPending = isCreating || isUpdating

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-10 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Margens de Lucro</h1>
                <p className="text-gray-600 mt-2">Configure os percentuais para cálculo das margens de lucro</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="space-y-2">
                            <Label htmlFor="cardPercentage">
                                Percentual de vendas no Cartão (%)
                            </Label>
                            <Input
                                id="cardPercentage"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...register("cardPercentage", { valueAsNumber: true })}
                                placeholder="0.00"
                            />
                            {errors.cardPercentage && (
                                <p className="text-red-600 text-sm">{errors.cardPercentage.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lossPercentage">
                                Percentual de perdas (%)
                            </Label>
                            <Input
                                id="lossPercentage"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...register("lossPercentage", { valueAsNumber: true })}
                                placeholder="0.00"
                            />
                            {errors.lossPercentage && (
                                <p className="text-red-600 text-sm">{errors.lossPercentage.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cardTaxPercentage">
                                Percentual pago de taxa de Cartão (%)
                            </Label>
                            <Input
                                id="cardTaxPercentage"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...register("cardTaxPercentage", { valueAsNumber: true })}
                                placeholder="0.00"
                            />
                            {errors.cardTaxPercentage && (
                                <p className="text-red-600 text-sm">{errors.cardTaxPercentage.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="breakagePercentage">
                                Percentual de Quebra (%)
                            </Label>
                            <Input
                                id="breakagePercentage"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...register("breakagePercentage", { valueAsNumber: true })}
                                placeholder="0.00"
                            />
                            {errors.breakagePercentage && (
                                <p className="text-red-600 text-sm">{errors.breakagePercentage.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="packagingPercentage">
                                Percentual pago para embalagens (%)
                            </Label>
                            <Input
                                id="packagingPercentage"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                {...register("packagingPercentage", { valueAsNumber: true })}
                                placeholder="0.00"
                            />
                            {errors.packagingPercentage && (
                                <p className="text-red-600 text-sm">{errors.packagingPercentage.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="min-w-[120px]"
                        >
                            {isPending ? 'Salvando...' : 'Salvar Configuração'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
} 