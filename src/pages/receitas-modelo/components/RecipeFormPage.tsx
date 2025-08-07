import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import { Loading } from '~/components/ui/loading'
import { useCreateInputMutation } from '~/hooks/recipes/useCreateInputMutation'
import { useGetRecipe } from '~/hooks/recipes/useGetRecipe'
import { useUpdateRecipeMutation } from '~/hooks/recipes/useUpdateRecipeMutation'
import { ROUTES } from '~/routes/routes'
import type { RecipeFormData } from '~/schema/receitas-modelo'
import {
    RecipeBasicInfo,
    RecipeCostPreview,
    RecipeFormProvider,
    RecipeIngredients
} from '../components'

export const RecipeFormPage = () => {
    const { id } = useParams<{ id: string }>()
    const isEditing = Boolean(id)
    const navigate = useNavigate()

    const { data: recipe, isLoading: recipeLoading } = useGetRecipe(id!)
    const { createInput, isPending: isCreating } = useCreateInputMutation()
    const { updateRecipe, isPending: isUpdating } = useUpdateRecipeMutation()

    const handleSubmit = async (data: RecipeFormData) => {
        try {
            if (isEditing && id) {
                await updateRecipe({
                    id,
                    data
                })
            } else {
                await createInput(data)
            }

            navigate(ROUTES.RECEITAS_MODELO)
        } catch (error) {
            console.error('Error saving recipe:', error)
        }
    }

    const isSubmitting = isCreating || isUpdating

    if (isEditing && recipeLoading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <Loading />
            </div>
        )
    }

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to={ROUTES.RECEITAS_MODELO}>
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {isEditing ? 'Editar Receita' : 'Nova Receita'}
                    </h1>
                    <p className="text-gray-600">
                        {isEditing ? 'Edite os dados da receita' : 'Preencha os dados para criar uma nova receita'}
                    </p>
                </div>
            </div>

            <RecipeFormProvider
                defaultValues={recipe}
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recipe Form */}
                    <RecipeBasicInfo />

                    {/* Cost Preview */}
                    <RecipeCostPreview />
                </div>

                {/* Ingredients Section */}
                <RecipeIngredients />

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-w-32"
                    >
                        {isSubmitting
                            ? (isEditing ? 'Salvando...' : 'Criando...')
                            : (isEditing ? 'Salvar Receita' : 'Criar Receita')
                        }
                    </Button>
                </div>
            </RecipeFormProvider>
        </div>
    )
} 