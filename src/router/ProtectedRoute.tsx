import { useAuth } from '../hooks/auth/useAuth'
import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRoute = () => {
    const { estaAutenticado } = useAuth();

    if (!estaAutenticado) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

