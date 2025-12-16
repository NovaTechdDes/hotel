import { FcStatistics } from 'react-icons/fc';
import { GoPeople } from 'react-icons/go';
import { IoDocumentTextOutline, IoSettingsOutline, IoSunnyOutline } from 'react-icons/io5';
import { LuBedDouble, LuLogOut } from 'react-icons/lu';
import { RiPushpinLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { FaArrowTrendDown } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { useTheme } from '../../hooks/ui/usetheme';
import { verificarRol } from '../../actions/auth.actions';

export const AsideBar = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [rol, setRol] = useState<string>('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const buscarRolUser = async () => {
    const rol = await verificarRol();
    setRol(rol);
  };

  useEffect(() => {
    buscarRolUser();
  }, []);

  return (
    <>
      <aside className={`bg-slate-200 dark:bg-slate-800 text-black dark:text-white px-5 h-screen fixed top-0 left-0 z-50 w-64 flex-col  ${open ? 'flex' : 'hidden'} sm:flex`}>
        <h3 className="text-xl font-bold my-2">Hotel Mis Casitas</h3>

        <nav className="gap-5 flex flex-col flex-1">
          <NavLink
            className={({ isActive }) => `flex hover:opacity-80 text-slate-800 dark:text-white items-center gap-2 ${isActive ? 'dark:bg-slate-700 bg-white p-2 rounded-lg' : ''}`}
            to="/calendario"
          >
            <RiPushpinLine />
            Inicio
          </NavLink>

          <NavLink className={({ isActive }) => `flex hover:opacity-80 text-slate-800 dark:text-white items-center gap-2 ${isActive ? 'dark:bg-slate-700 bg-white p-2 rounded-lg' : ''}`} to="/reserva">
            <IoDocumentTextOutline />
            Reservas
          </NavLink>

          <NavLink
            className={({ isActive }) => `flex hover:opacity-80 text-slate-800 dark:text-white items-center gap-2 ${isActive ? 'dark:bg-slate-700 bg-white p-2 rounded-lg' : ''}`}
            to="/habitacion"
          >
            <LuBedDouble />
            Habitaciones
          </NavLink>

          <NavLink className={({ isActive }) => `flex hover:opacity-80 text-slate-800 dark:text-white items-center gap-2 ${isActive ? 'dark:bg-slate-700 bg-white p-2 rounded-lg' : ''}`} to="/cliente">
            <GoPeople />
            Clientes
          </NavLink>

          {rol === 'admin' && (
            <NavLink
              className={({ isActive }) => `flex hover:opacity-80 text-slate-800 dark:text-white items-center gap-2 ${isActive ? 'dark:bg-slate-700 bg-white p-2 rounded-lg' : ''}`}
              to="/reporte"
            >
              <FcStatistics />
              Reportes
            </NavLink>
          )}
          {rol === 'admin' && (
            <NavLink
              className={({ isActive }) => `flex hover:opacity-80 text-slate-800 dark:text-white items-center gap-2 ${isActive ? 'dark:bg-slate-700 bg-white p-2 rounded-lg' : ''}`}
              to="/egreso"
            >
              <FaArrowTrendDown />
              Egreso
            </NavLink>
          )}
        </nav>

        <div className="mt-auto mb-3 flex flex-col gap-5 pb-4">
          <button onClick={toggleTheme} className="border-t border-slate-400 py-2 flex hover:opacity-80 items-center gap-2 cursor-pointer">
            <IoSunnyOutline />
            Modo {theme === 'light' ? 'Oscuro' : 'Claro'}
          </button>

          <NavLink
            className={({ isActive }) =>
              `flex hover:opacity-80 text-slate-800 dark:text-white items-center gap-2 dark:bg-slate-700 dark:border-gray-600 p-2 rounded-lg ${isActive ? 'bg-white p-2 rounded-lg' : ''}`
            }
            to="/configuracion"
          >
            <IoSettingsOutline />
            Configuración
          </NavLink>

          <div onClick={handleLogout} className="flex cursor-pointer hover:opacity-80 text-red-600 font-semibold items-center gap-2 ">
            <LuLogOut />
            Cerrar Sesion
          </div>
        </div>
      </aside>

      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="fixed top-4 left-4 z-50 sm:hidden p-2 rounded-md bg-blue-500 text-white"
      >
        <MdOutlineMenu />
      </button>
    </>
  );
};
