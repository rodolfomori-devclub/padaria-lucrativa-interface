import { useRecipes } from "~/hooks/recipes/useRecipes"
import { Combobox } from "../ui/combobox"

interface RecipesSelectProps {
    value: string
    label: string
    onChange: (value: { id: string, name: string }) => void
}

export function RecipesSelect({ value, label, onChange }: RecipesSelectProps) {
    const { recipes, isLoading } = useRecipes()

    return (
        <Combobox
            value={value}
            label={label}
            placeholder="Selecione um produto..."
            searchPlaceholder="Digite o nome do produto..."
            emptyMessage="Nenhum produto encontrado"
            options={recipes.map(recipe => ({
                id: recipe.id,
                name: recipe.name
            }))}
            isLoading={isLoading}
            onChange={onChange}
        />
    )
}