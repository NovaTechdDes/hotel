import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Calendario, Error404, Login, Reserva } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '../layout/MainLayout';
import { PublicRoute } from './PublicRoute';
import { Habitacion } from '../pages/dashboard/Habitacion';
import { Cliente } from '../pages/dashboard/Cliente';
import { Reporte } from '../pages/dashboard/Reporte';
import Egreso from '../pages/dashboard/Egreso';
import { Configuracion } from '../pages/dashboard/Configuracion';
import RecoverPassword from '../pages/auth/RecoverPassword';
import UpdatePassword from '../pages/auth/UpdatePassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <Error404 />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="calendario" replace /> },
          { path: 'calendario', element: <Calendario /> },
          { path: 'reserva', element: <Reserva /> },
          { path: 'habitacion', element: <Habitacion /> },
          { path: 'cliente', element: <Cliente /> },
          { path: 'reporte', element: <Reporte /> },
          { path: 'egreso', element: <Egreso /> },
          { path: 'configuracion', element: <Configuracion /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <PublicRoute />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    path: '/recuperar-contraseña',
    element: <PublicRoute />,
    children: [{ path: '/recuperar-contraseña', element: <RecoverPassword /> }],
  },
  {
    path: '/actualizar-contraseña',
    element: <PublicRoute />,
    children: [{ path: '/actualizar-contraseña', element: <UpdatePassword /> }],
  },
]);
