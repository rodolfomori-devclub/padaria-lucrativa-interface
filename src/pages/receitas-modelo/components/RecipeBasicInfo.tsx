import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select'
import type { RecipeFormData } from '~/schema/receitas-modelo'
import { UNIT_MEASURE_LABELS, UnitMeasure } from '~/types/input'
import { formatCurrency, removeNonNumeric } from '~/utils/formaters'

export const RecipeBasicInfo = () => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch
    } = useFormContext<RecipeFormData>()

    const watchedValues = watch()

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Dados da Receita</h2>

            <div className="space-y-4">
                <div>
                    <Input
                        id="name"
                        label="Nome da Receita *"
                        {...register('name')}
                        placeholder="Ex: Pão Francês"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <Input
                        id="yield"
                        type="number"
                        label="Rendimento *"
                        step="0.001"
                        {...register('yield', { valueAsNumber: true })}
                        placeholder="Quantidade que a receita produz"
                    />
                    {errors.yield && (
                        <p className="text-sm text-red-500 mt-1">{errors.yield.message}</p>
                    )}
                </div>

                <Controller
                    control={control}
                    name="salePrice"
                    render={({ field }) => {
                        const { onChange, value, ...fieldProps } = field
                        const formattedValue = formatCurrency(value)

                        return (
                            <Input
                                id="salePrice"
                                label="Preço de venda praticado *"
                                {...fieldProps}
                                value={formattedValue}
                                onChange={(e) => onChange(Number(removeNonNumeric(e.target.value)))}
                                placeholder="0,00"
                            />
                        )
                    }}
                />
                {errors.salePrice && (
                    <p className="text-sm text-red-500 mt-1">{errors.salePrice.message}</p>
                )}
                <div>
                    <Label htmlFor="unitMeasure">Unidade de Medida *</Label>
                    <Select
                        value={watchedValues.unitMeasure}
                        onValueChange={(value) => setValue('unitMeasure', value as UnitMeasure)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a unidade de medida" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(UNIT_MEASURE_LABELS).map(([key, label]) => (
                                <SelectItem key={key} value={key}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.unitMeasure && (
                        <p className="text-sm text-red-500 mt-1">{errors.unitMeasure.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
} 