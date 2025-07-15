import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table'
import { useInputs } from '~/hooks/inputs/useInputs'
import type { RecipeFormData } from '~/schema/receitas-modelo'
import { UNIT_MEASURE_LABELS } from '~/types/input'
import { formatCurrency } from '~/utils/formaters'

export const RecipeIngredients = () => {
    const { inputs, isLoading: inputsLoading } = useInputs()
    const [newIngredient, setNewIngredient] = useState({ inputId: '', quantity: 0 })

    const { control, formState: { errors } } = useFormContext<RecipeFormData>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'inputs'
    })

    const handleAddIngredient = () => {
        if (newIngredient.inputId && newIngredient.quantity > 0) {
            const existingIndex = fields.findIndex(field => field.inputId === newIngredient.inputId)

            if (existingIndex !== -1) {
                // Update existing ingredient quantity
                const existingQuantity = fields[existingIndex].quantity
                remove(existingIndex)
                append({
                    inputId: newIngredient.inputId,
                    quantity: existingQuantity + newIngredient.quantity
                })
            } else {
                // Add new ingredient
                append({
                    inputId: newIngredient.inputId,
                    quantity: newIngredient.quantity
                })
            }

            setNewIngredient({ inputId: '', quantity: 0 })
        }
    }

    const handleRemoveIngredient = (index: number) => {
        remove(index)
    }

    if (inputsLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Ingredientes</h2>
                <p>Carregando insumos...</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Ingredientes</h2>

            {/* Add Ingredient Form */}
            <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-3">Adicionar Ingrediente</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="inputId">Insumo</Label>
                        <Select
                            value={newIngredient.inputId}
                            onValueChange={(value) => setNewIngredient(prev => ({ ...prev, inputId: value }))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um insumo" />
                            </SelectTrigger>
                            <SelectContent>
                                {inputs.map(input => (
                                    <SelectItem key={input.id} value={input.id}>
                                        {input.name} - {formatCurrency(input.unitCost)}/{UNIT_MEASURE_LABELS[input.unitMeasure]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.inputs && (
                            <p className="text-sm text-red-500 mt-2">{errors.inputs.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="quantity">Quantidade</Label>
                        <Input
                            id="quantity"
                            type="number"
                            step="0.001"
                            value={newIngredient.quantity}
                            onChange={(e) => setNewIngredient(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                            placeholder="Quantidade necessária"
                        />
                    </div>
                    <div className="flex items-end">
                        <Button
                            type="button"
                            onClick={handleAddIngredient}
                            disabled={!newIngredient.inputId || newIngredient.quantity <= 0}
                            className="w-full"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar
                        </Button>
                    </div>
                </div>
            </div>

            {/* Ingredients Table */}
            {fields.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Insumo</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Custo Unitário</TableHead>
                            <TableHead>Custo Total</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fields.map((field, index) => {
                            const input = inputs.find(i => i.id === field.inputId)
                            const cost = input ? input.unitCost * field.quantity : 0

                            return (
                                <TableRow key={field.id}>
                                    <TableCell>
                                        {input?.name || 'Insumo não encontrado'}
                                    </TableCell>
                                    <TableCell>
                                        {field.quantity} {input && UNIT_MEASURE_LABELS[input.unitMeasure]}
                                    </TableCell>
                                    <TableCell>
                                        {input && formatCurrency(input.unitCost)}
                                    </TableCell>
                                    <TableCell>{formatCurrency(cost)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            type="button"
                                            onClick={() => handleRemoveIngredient(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>Nenhum ingrediente adicionado</p>
                    <p className="text-sm mt-1">Adicione ingredientes para calcular o custo da receita</p>
                </div>
            )}
        </div>
    )
} 