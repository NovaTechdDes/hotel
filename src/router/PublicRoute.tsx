import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth"

export const PublicRoute = () => {
    const { estaAutenticado } = useAuth();

    if (estaAutenticado) {
        return <Navigate to='/calendario' />
    };

    return <Outlet />
}