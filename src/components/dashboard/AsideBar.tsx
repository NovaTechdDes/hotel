import { FcStatistics } from "react-icons/fc"
import { GoPeople } from "react-icons/go"
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5"
import { LuBedDouble, LuLogOut } from "react-icons/lu"
import { RiPushpinLine } from "react-icons/ri"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/auth/useAuth"
import { FaArrowTrendDown } from "react-icons/fa6"

export const AsideBar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <aside className="bg-slate-200 text-black px-5 h-screen flex flex-col">
            <h3 className="text-xl font-bold my-2">Hotel Mis Casitas</h3>

            <nav className="gap-5 flex flex-col flex-1">
                <NavLink className={({ isActive }) => `flex hover:opacity-80 text-slate-800 items-center gap-2 ${isActive ? 'bg-white p-2 rounded-lg' : ''}`} to='/calendario'>
                    <RiPushpinLine />
                    Inicio
                </NavLink>

                <NavLink className={({ isActive }) => `flex hover:opacity-80 text-slate-800 items-center gap-2 ${isActive ? 'bg-white p-2 rounded-lg' : ''}`} to='/reserva'>
                    <IoDocumentTextOutline />
                    Reservas
                </NavLink>

                <NavLink className={({ isActive }) => `flex hover:opacity-80 text-slate-800 items-center gap-2 ${isActive ? 'bg-white p-2 rounded-lg' : ''}`} to='/habitacion'>
                    <LuBedDouble />
                    Habitaciones
                </NavLink>

                <NavLink className={({ isActive }) => `flex hover:opacity-80 text-slate-800 items-center gap-2 ${isActive ? 'bg-white p-2 rounded-lg' : ''}`} to='/cliente'>
                    <GoPeople />
                    Clientes
                </NavLink>

                <NavLink className={({ isActive }) => `flex hover:opacity-80 text-slate-800 items-center gap-2 ${isActive ? 'bg-white p-2 rounded-lg' : ''}`} to='/reporte'>
                    <FcStatistics />
                    Reportes
                </NavLink>

                <NavLink className={({ isActive }) => `flex hover:opacity-80 text-slate-800 items-center gap-2 ${isActive ? 'bg-white p-2 rounded-lg' : ''}`} to='/egreso'>
                    <FaArrowTrendDown />
                    Egreso
                </NavLink>
            </nav>

            <div className="mt-auto mb-3 flex flex-col gap-5 pb-4">
                <NavLink className={({ isActive }) =>
                    `flex hover:opacity-80 text-slate-800 items-center gap-2 py-2 border-t border-slate-400 ${isActive ? 'bg-white p-2 rounded-lg' : ''}`
                }
                    to='/configuracion'>
                    <IoSettingsOutline />
                    Configuración
                </NavLink>

                <div onClick={handleLogout} className="flex cursor-pointer hover:opacity-80 text-red-600 font-semibold items-center gap-2 ">
                    <LuLogOut />
                    Cerrar Sesion
                </div>
            </div>
        </aside>
    )
}
