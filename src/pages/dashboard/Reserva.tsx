import { GoSearch } from 'react-icons/go';
import { useReservas } from '../../hooks/reserva/useReservas';
import { ReservaCard } from '../../components/dashboard/reserva/ReservaCard';
import { DetallesReserva, Loading, ModalCalendario } from '../../components';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useReservaStore } from '../../store/reserva.store';
import { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { nombreMes } from '../../helpers/nombreMes';

export const Reserva = () => {
  const { isDetalleOpen, isModalOpen, mesSeleccionado, anioSeleccionado, setMesSeleccionado } = useReservaStore();
  const { data: reservas, isLoading } = useReservas(mesSeleccionado, anioSeleccionado, true);

  const handlePreviusMonth = () => {
    setMesSeleccionado(mesSeleccionado - 1);
  };

  const handleNextMonth = () => {
    setMesSeleccionado(mesSeleccionado + 1);
  };

  const [buscador, setBuscador] = useState('');

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-[#1E1B18] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-[#B59E6B]/20 pb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-tight">Libro de Huéspedes</h1>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#B59E6B] font-bold">Registro de Estancias y Hospitalidad</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
            <div className="flex items-center bg-white dark:bg-[#B59E6B]/10 border border-[#B59E6B]/20 rounded-sm px-2 py-1.5 shadow-sm group transition-all duration-500 hover:border-[#B59E6B]/40">
              <button onClick={handlePreviusMonth} className="p-2 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors" title="Mes Anterior">
                <MdKeyboardArrowLeft size={24} />
              </button>

              <div className="px-6 flex flex-col items-center min-w-[140px]">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59E6B] leading-none mb-1">Periodo Actual</p>
                <p className="text-sm font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-widest font-medium">
                  {nombreMes(mesSeleccionado).toUpperCase()} {anioSeleccionado}
                </p>
              </div>

              <button onClick={handleNextMonth} className="p-2 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors" title="Siguiente Mes">
                <MdKeyboardArrowRight size={24} />
              </button>
            </div>
          </div>
        </header>

        <section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          <div className="relative group max-w-2xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 text-[#2D2926]/30 dark:text-[#FDFCFB]/20 group-focus-within:text-[#B59E6B]">
              <GoSearch size={18} />
            </div>
            <input
              type="text"
              name="buscador"
              id="buscador"
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)}
              placeholder="Buscar en el registro por nombre o suite..."
              className="w-full bg-white dark:bg-[#2D2926] border border-[#B59E6B]/10 rounded-sm pl-12 pr-4 py-4 text-sm text-[#2D2926] dark:text-[#FDFCFB] placeholder:text-[#2D2926]/30 dark:placeholder:text-[#FDFCFB]/20 focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 shadow-[var(--shadow-boutique)]"
            />
          </div>
        </section>

        <section className="bg-white/50 dark:bg-black/5 rounded-sm overflow-hidden min-h-[500px] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          {isLoading ? (
            <div className="flex items-center justify-center py-40">
              <Loading text="Sincronizando Libro de Estancias..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1">
              {reservas
                ?.filter((r) => r.mostrar)
                .map((reserva) => (
                  <ReservaCard buscador={buscador} reserva={reserva} key={reserva.id} />
                ))}

              {reservas?.filter((r) => r.mostrar).length === 0 && (
                <div className="py-40 flex flex-col items-center justify-center border-2 border-dashed border-[#B59E6B]/10 rounded-sm text-[#2D2926]/30 dark:text-[#FDFCFB]/20">
                  <IoDocumentTextOutline size={48} className="mb-4 opacity-10" />
                  <p className="text-xs uppercase tracking-[0.2em] font-bold">No se registran estancias en este periodo</p>
                </div>
              )}
            </div>
          )}
        </section>

        {isDetalleOpen && <DetallesReserva />}
        {isModalOpen && <ModalCalendario />}
      </div>
    </div>
  );
};
