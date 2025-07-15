import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Label, Loading } from '~/components/ui'
import { useAuth } from '~/contexts/AuthContext'
import { ROUTES } from '~/routes/routes'
import { loginSchema, type LoginFormData } from '~/schema/auth'
import { authService } from '~/services/auth'
import type { AuthResponse } from '~/types/auth'

export function LoginPage() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await authService.login(data)
            return response
        },
        onSuccess: (data: AuthResponse) => {
            login(data)
            navigate(ROUTES.DASHBOARD)
        },
        onError: () => {
            toast.error("E-mail ou senha inválidos")
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        await mutateAsync(data)
    }

    return (
        <div className="min-h-screen flex">
            {/* Image Section - 1/3 */}
            <div className="hidden lg:flex lg:w-1/3 bg-base relative">
                <img
                    src="/login-image.jpg"
                    alt="Login"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-base/20" />
            </div>

            {/* Form Section - 2/3 */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base-light">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-base">
                            Acesse sua conta
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Entre com suas credenciais para continuar
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <Loading size="sm" />
                                    Entrando...
                                </div>
                            ) : (
                                'Entrar'
                            )}
                        </Button>

                        <div className="flex items-center justify-between text-sm">
                            <Link
                                to="/forgot-password"
                                className="text-highlight hover:text-highlight/80"
                            >
                                Esqueceu sua senha?
                            </Link>
                            <Link
                                to="/register"
                                className="text-highlight hover:text-highlight/80"
                            >
                                Criar conta
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 