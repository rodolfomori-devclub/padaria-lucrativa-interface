import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Loading } from '~/components/ui/loading'
import { useAuth } from '~/contexts/AuthContext'
import { ROUTES } from '~/routes/routes'
import { UserRole } from '~/types/user'

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, isLoading, isInitialized } = useAuth()
    const { pathname } = useLocation()

    const isAuthPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER

    // Show loading while authentication is being initialized
    if (!isInitialized || (isLoading && !isAuthPage)) {
        return <div className='h-screen grid place-items-center'><Loading className='size-10 border-4' /></div>
    }

    // If user is not authenticated and trying to access protected route
    if (!user && !isAuthPage) {
        return <Navigate to={ROUTES.LOGIN} replace />
    }

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    const isStaff = user?.role === UserRole.ADMIN || user?.role === UserRole.EMPLOYEE;
    if (user && isAuthPage) {
        return isStaff ? <Navigate to={ROUTES.ADMIN_CLIENTES} replace /> : <Navigate to={ROUTES.DASHBOARD} replace />
    }

    return <>{children}</>
} 