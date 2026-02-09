import { GoPeople } from 'react-icons/go';
import { IoDocumentTextOutline, IoSettingsOutline, IoSunnyOutline, IoMoonOutline, IoStatsChartOutline } from 'react-icons/io5';
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

  const buscarRolUser = async () => {
    const rol = await verificarRol();
    setRol(rol);
  };

  useEffect(() => {
    buscarRolUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-500 relative overflow-hidden ${
      isActive ? 'text-[#B59E6B] bg-[#B59E6B]/10 font-medium' : 'text-[#2D2926]/60 dark:text-[#FDFCFB]/60 hover:text-[#2D2926] dark:hover:text-[#FDFCFB] hover:bg-[#B59E6B]/5'
    }`;

  const iconClass = 'text-lg transition-colors duration-500';

  return (
    <>
      <aside
        className={`bg-[#FDFCFB] dark:bg-[#2D2926] text-[#2D2926] dark:text-[#FDFCFB] h-screen fixed top-0 left-0 z-50 w-64 flex flex-col border-r border-[#B59E6B]/10 dark:border-[#FDFCFB]/5 transition-all duration-500 ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 shadow-2xl`}
      >
        <div className="p-8 mb-4">
          <h3 className="text-xl font-serif font-light tracking-widest text-[#B59E6B] border-b border-[#B59E6B]/20 pb-4">HOTEL MIS CASITAS</h3>
          <p className="text-[10px] uppercase tracking-[0.4em] mt-2 opacity-40 dark:opacity-40">Gestión Interna</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <NavLink className={navLinkClass} to="/calendario" onClick={() => setOpen(false)}>
            <RiPushpinLine className={iconClass} />
            <span className="text-sm tracking-wide">Inicio</span>
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B59E6B] scale-y-0 group-[.active]:scale-y-100 transition-transform duration-500" />
          </NavLink>

          <NavLink className={navLinkClass} to="/reserva" onClick={() => setOpen(false)}>
            <IoDocumentTextOutline className={iconClass} />
            <span className="text-sm tracking-wide">Reservas</span>
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B59E6B] scale-y-0 group-[.active]:scale-y-100 transition-transform duration-500" />
          </NavLink>

          <NavLink className={navLinkClass} to="/habitacion" onClick={() => setOpen(false)}>
            <LuBedDouble className={iconClass} />
            <span className="text-sm tracking-wide">Habitaciones</span>
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B59E6B] scale-y-0 group-[.active]:scale-y-100 transition-transform duration-500" />
          </NavLink>

          <NavLink className={navLinkClass} to="/cliente" onClick={() => setOpen(false)}>
            <GoPeople className={iconClass} />
            <span className="text-sm tracking-wide">Clientes</span>
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B59E6B] scale-y-0 group-[.active]:scale-y-100 transition-transform duration-500" />
          </NavLink>

          {rol === 'admin' && (
            <NavLink className={navLinkClass} to="/reporte" onClick={() => setOpen(false)}>
              <IoStatsChartOutline className={iconClass} />
              <span className="text-sm tracking-wide">Reportes</span>
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B59E6B] scale-y-0 group-[.active]:scale-y-100 transition-transform duration-500" />
            </NavLink>
          )}

          {rol === 'admin' && (
            <NavLink className={navLinkClass} to="/egreso" onClick={() => setOpen(false)}>
              <FaArrowTrendDown className={iconClass} />
              <span className="text-sm tracking-wide">Egreso</span>
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#B59E6B] scale-y-0 group-[.active]:scale-y-100 transition-transform duration-500" />
            </NavLink>
          )}
        </nav>

        <div className="mt-auto px-4 pb-8 space-y-4">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors duration-500"
          >
            {theme === 'light' ? <IoMoonOutline className="text-lg" /> : <IoSunnyOutline className="text-lg" />}
            Modo {theme === 'light' ? 'Oscuro' : 'Claro'}
          </button>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-sm text-xs uppercase tracking-widest transition-all duration-500 ${
                isActive ? 'text-[#B59E6B] border border-[#B59E6B]/30' : 'text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#2D2926] dark:hover:text-[#FDFCFB]'
              }`
            }
            to="/configuracion"
            onClick={() => setOpen(false)}
          >
            <IoSettingsOutline className="text-base" />
            Configuración
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-widest text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all duration-500 rounded-sm"
          >
            <LuLogOut className="text-base" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 sm:hidden p-4 rounded-full bg-[#B59E6B] text-[#2D2926] shadow-xl hover:scale-110 active:scale-95 transition-all duration-500"
      >
        <MdOutlineMenu className="text-2xl" />
      </button>
    </>
  );
};
