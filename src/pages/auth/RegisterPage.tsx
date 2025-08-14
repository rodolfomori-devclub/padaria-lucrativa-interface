import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Label, Loading } from '~/components/ui'
import { useAuth } from '~/contexts/AuthContext'
import { ROUTES } from '~/routes/routes'
import { registerSchema, type RegisterFormData } from '~/schema/auth'
import { authService } from '~/services/auth'
import type { AuthResponse } from '~/types/auth'
import { formatPhone } from '~/utils/formaters'

export function RegisterPage() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [error, setError] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            const response = await authService.register({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
            })
            return response
        },
        onSuccess: (data: AuthResponse) => {
            login(data)
            navigate(ROUTES.DASHBOARD)
        },
        onError: (error) => {
            setError(error.message)
        },
    })

    const onSubmit = async (data: RegisterFormData) => {
        setError('')
        await mutateAsync(data)
    }

    return (
        <div className="min-h-screen flex">
            {/* Image Section - 1/3 */}
            <div className="hidden lg:flex lg:w-1/3 bg-base relative">
                <img
                    src="/login-image.jpg"
                    alt="Cadastro"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-base/20" />
            </div>

            {/* Form Section - 2/3 */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base-light">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-base">
                            Criar sua conta
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Preencha os dados para se cadastrar
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Seu nome completo"
                                {...register('name')}
                                className="mt-1"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

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

                        <div>
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                type="text"
                                placeholder="(11) 99999-9999"
                                {...register('phone', {
                                    onChange: (e) => {
                                        e.target.value = formatPhone(e.target.value)
                                    }
                                })}
                                className="mt-1"
                                maxLength={15}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                className="mt-1"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirmação de senha</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register('confirmPassword')}
                                className="mt-1"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
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
                                    Criando conta...
                                </div>
                            ) : (
                                'Criar conta'
                            )}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-gray-600">Já tem uma conta? </span>
                            <Link
                                to={ROUTES.LOGIN}
                                className="text-highlight hover:text-highlight/80"
                            >
                                Faça login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 