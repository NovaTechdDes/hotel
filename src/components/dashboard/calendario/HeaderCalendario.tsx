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
    <header className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-tight">Calendario</h1>
        <p className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#88754e] font-bold">Gestión de Ocupación</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto items-stretch sm:items-center">
        {/* Selector de Periodo Pro */}
        <div className="flex items-center justify-between bg-white dark:bg-[#B59E6B]/10 border border-[#B59E6B]/20 rounded-sm px-2 py-1.5 shadow-sm group transition-all duration-500 hover:border-[#B59E6B]/40">
          <button onClick={handlePreviusMonth} className="p-2 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors" title="Mes Anterior">
            <MdKeyboardArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div className="px-4 sm:px-6 flex flex-col items-center min-w-[120px] sm:min-w-[140px]">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59E6B] leading-none mb-1">Periodo</p>
            <p className="text-xs sm:text-sm font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-widest font-medium">
              {nombreMes(mesSeleccionado).toUpperCase()} {anioSeleccionado}
            </p>
          </div>

          <button onClick={handleNextMonth} className="p-2 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors" title="Siguiente Mes">
            <MdKeyboardArrowRight size={20} className="sm:w-6 sm:h-6" />
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
