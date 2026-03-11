import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Input, Label, Loading } from '~/components/ui'
import { authService } from '~/services/auth'
import { ROUTES } from '~/routes/routes'
import { resetPasswordSchema, type ResetPasswordFormData } from '~/schema/auth'

export function ResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token')
    const isInvite = searchParams.get('type') === 'invite'

    const { data: validation, isLoading: isValidating } = useQuery({
        queryKey: ['validate-reset-token', token],
        queryFn: () => authService.validateResetToken(token!),
        enabled: !!token,
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { token: token ?? '' },
    })

    useEffect(() => {
        if (token) {
            setValue('token', token)
        }
    }, [token, setValue])

    const { mutateAsync, isPending } = useMutation({
        mutationFn: authService.resetPassword,
        onSuccess: () => {
            toast.success(isInvite ? 'Senha definida com sucesso! Faça login para continuar.' : 'Senha redefinida com sucesso! Faça login para continuar.')
            navigate(ROUTES.LOGIN)
        },
        onError: (error: unknown) => {
            const msg =
                (error as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ??
                'Token inválido ou expirado. Solicite um novo link.'
            toast.error(msg)
        },
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        await mutateAsync({ token: data.token, password: data.password })
    }

    useEffect(() => {
        if (!token) {
            navigate(ROUTES.FORGOT_PASSWORD, { replace: true })
        }
    }, [token, navigate])

    if (!token) {
        return null
    }

    if (isValidating) {
        return (
            <div className="min-h-screen flex">
                <div className="hidden lg:flex lg:w-1/3 bg-base relative">
                    <img
                        src="/login-image.jpg"
                        alt="Redefinir senha"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-base/20" />
                </div>
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base-light">
                    <div className="flex flex-col items-center gap-4">
                        <Loading className="size-10 border-4" />
                        <p className="text-gray-600">Validando link...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!validation?.valid) {
        return (
            <div className="min-h-screen flex">
                <div className="hidden lg:flex lg:w-1/3 bg-base relative">
                    <img
                        src="/login-image.jpg"
                        alt="Link expirado"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-base/20" />
                </div>
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base-light">
                    <div className="max-w-md w-full space-y-8 text-center">
                        <div>
                            <h2 className="text-3xl font-bold text-base">
                                Link expirado
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Este link de recuperação expirou ou já foi utilizado.
                                Solicite um novo para redefinir sua senha.
                            </p>
                        </div>
                        <Link to={ROUTES.LOGIN}>
                            <Button className="w-full">
                                Ir para login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/3 bg-base relative">
                <img
                    src="/login-image.jpg"
                    alt="Redefinir senha"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-base/20" />
            </div>

            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-base-light">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-base">
                            {isInvite ? 'Definir senha' : 'Redefinir senha'}
                        </h2>
                        <p className="mt-2 text-gray-600">
                            {isInvite ? 'Defina sua senha para acessar a plataforma' : 'Digite sua nova senha abaixo'}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register('token')} />

                        <div>
                            <Label htmlFor="password">{isInvite ? 'Senha' : 'Nova senha'}</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                className="mt-1"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirmar senha</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register('confirmPassword')}
                                className="mt-1"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.confirmPassword.message}
                                </p>
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
                                    {isInvite ? 'Definindo...' : 'Redefinindo...'}
                                </div>
                            ) : (
                                isInvite ? 'Definir senha' : 'Redefinir senha'
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
