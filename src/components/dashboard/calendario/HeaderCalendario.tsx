import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useCalendarioStore } from '../../../store/calendario.store';
import { nombreMes } from '../../../helpers/nombreMes';

export const HeaderCalendario = () => {
  const { setMesSeleccionado, anioSeleccionado, mesSeleccionado } = useCalendarioStore();

  const handlePreviusMonth = () => {
    setMesSeleccionado(mesSeleccionado - 1);
  };

  const handleNextMonth = () => {
    setMesSeleccionado(mesSeleccionado + 1);
  };

  return (
    <header className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="space-y-1">
        <h1 className="text-4xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-tight">Calendario</h1>
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#88754e] font-bold">Gestión de Ocupación y Disponibilidad</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto items-center">
        {/* Selector de Periodo Pro */}
        <div className="flex items-center bg-white dark:bg-[#B59E6B]/10 border border-[#B59E6B]/20 rounded-sm px-2 py-1.5 shadow-sm group transition-all duration-500 hover:border-[#B59E6B]/40">
          <button onClick={handlePreviusMonth} className="p-2 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors" title="Mes Anterior">
            <MdKeyboardArrowLeft size={24} />
          </button>

          <div className="px-6 flex flex-col items-center min-w-[140px]">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59E6B] leading-none mb-1">Periodo</p>
            <p className="text-sm font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-widest font-medium">
              {nombreMes(mesSeleccionado).toUpperCase()} {anioSeleccionado}
            </p>
          </div>

          <button onClick={handleNextMonth} className="p-2 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors" title="Siguiente Mes">
            <MdKeyboardArrowRight size={24} />
          </button>
        </div>

        {/* <button
          onClick={handleModalReserva}
          className="w-full sm:w-auto bg-[#2D2926] dark:bg-[#B59E6B] text-[#FDFCFB] dark:text-[#2D2926] px-8 py-3.5 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-all shadow-sm active:scale-95"
        >
          Nueva Reserva
        </button> */}
      </div>
    </header>
  );
};
