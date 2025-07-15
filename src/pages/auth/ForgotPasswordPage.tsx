import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, Input, Label, Loading } from '~/components/ui'
import { ROUTES } from '~/routes/routes'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '~/schema/auth'
import { authService } from '~/services/auth'

export function ForgotPasswordPage() {
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: authService.forgotPassword,
        onSuccess: () => {
            setSuccess('E-mail de recuperação enviado! Verifique sua caixa de entrada.')
            setError('')
        },
        onError: (error) => {
            setError(error.message)
            setSuccess('')
        },
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        await mutateAsync(data)
    }

    return (
        <div className="min-h-screen flex">
            {/* Image Section - 1/3 */}
            <div className="hidden lg:flex lg:w-1/3 bg-base relative">
                <img
                    src="/login-image.jpg"
                    alt="Recuperar Senha"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-base/20" />
            </div>

            {/* Form Section - 2/3 */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base-light">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-base">
                            Recuperar senha
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Digite seu e-mail para receber as instruções de recuperação
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 rounded-md p-3">
                                <p className="text-sm text-green-600">{success}</p>
                            </div>
                        )}

                        <div>
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                {...register('email')}
                                className="mt-1"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <Loading size="sm" />
                                    Enviando...
                                </div>
                            ) : (
                                'Enviar e-mail de recuperação'
                            )}
                        </Button>

                        <div className="text-center text-sm">
                            <Link
                                to={ROUTES.LOGIN}
                                className="text-highlight hover:text-highlight/80"
                            >
                                ← Voltar para login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 