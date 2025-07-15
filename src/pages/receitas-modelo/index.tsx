import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import { Loading } from '~/components/ui/loading'
import { useRecipes } from '~/hooks/recipes/useRecipes'
import { ROUTES } from '~/routes/routes'
import { RecipesTable } from './components/RecipesTable'

export const ReceitasModeloPage = () => {
    const { recipes, isLoading, error } = useRecipes()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <Loading />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <p className="text-red-500">Erro ao carregar receitas</p>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Receitas Modelo</h1>
                        <p className="text-gray-600 mt-2">Gerencie suas receitas e calcule custos e preços sugeridos</p>
                    </div>
                    <Link to={ROUTES.RECEITAS_MODELO_NOVA}>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Nova Receita
                        </Button>
                    </Link>
                </div>

            </div>
            <RecipesTable recipes={recipes} />
        </div>
    )
} 