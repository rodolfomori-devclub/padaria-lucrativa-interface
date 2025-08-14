import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '~/contexts/AuthContext'
import { ROUTES } from '~/routes/routes'
import { UserRole } from '~/types/user'

interface AdminProtectedRouteProps {
    children: ReactNode
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
    const { user } = useAuth()

    if (user?.role !== UserRole.ADMIN && user?.role !== UserRole.EMPLOYEE) {
        return <Navigate to={ROUTES.DASHBOARD} replace />
    }

    return <>{children}</>;
}