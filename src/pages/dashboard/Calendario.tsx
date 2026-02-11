// CalendarioHotel.tsx
import { setMonth, setYear } from 'date-fns';
import { useClientes, useHabitaciones } from '../../hooks';

import { useReservaStore } from '../../store/reserva.store';

import { useReservas } from '../../hooks/reserva/useReservas';

import { formatearAString } from '../../helpers/formatearFecha';
import { DetallesReserva, HeaderCalendario, ModalCalendario } from '../../components';
import { useEffect, useRef, useState } from 'react';
import { traerDiasDelMes } from '../../helpers/traerDiasDelMes';
import { useCalendarioStore } from '../../store/calendario.store';
import TrCalendario from '../../components/dashboard/calendario/TrCalendario';
import { TrHabitacionCalendario } from '../../components/dashboard/calendario/TrHabitacionCalendario';
import { useIsMobile } from '../../helpers/useIsMobile';
import { CalendarioMobile } from '../../components/dashboard/calendario/CalendarioMobile';

export const Calendario = () => {
  const { mesSeleccionado, anioSeleccionado } = useCalendarioStore();

  const [days, setDays] = useState(traerDiasDelMes(new Date()));
  const { isModalOpen, openDetalle, openModal, isDetalleOpen } = useReservaStore();
  const { data: reservas, isLoading } = useReservas(mesSeleccionado, anioSeleccionado);

  const { data: habitaciones } = useHabitaciones();
  const { data: clientes } = useClientes();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLTableCellElement>(null);

  const handleReserva = (e: React.MouseEvent<HTMLTableCellElement>, day: Date, habitacionid: string) => {
    const target = e.currentTarget as HTMLTableCellElement;
    if (target.id === '') {
      openModal(formatearAString(day).slice(0, 10), habitacionid);
    } else {
      openDetalle(reservas?.find((reserva) => reserva.id === target.id));
    }
  };

  useEffect(() => {
    const date = setMonth(new Date(), mesSeleccionado);
    const year = setYear(date, anioSeleccionado);
    setDays(traerDiasDelMes(year));
  }, [mesSeleccionado, anioSeleccionado]);

  useEffect(() => {
    if (todayRef.current) {
      scrollContainerRef.current?.scrollTo({ left: todayRef.current.offsetLeft - 200, behavior: 'smooth' });
    }
  }, [days]);

  const isMobile = useIsMobile();

  if (isMobile && reservas) {
    return <CalendarioMobile reservas={reservas} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-[#1E1B18] transition-colors duration-500 overflow-hidden flex flex-col">
      <HeaderCalendario />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-10 overflow-y-auto">
        <div
          ref={scrollContainerRef}
          className=" bg-white dark:bg-[#2D2926] border border-[#B59E6B]/10 rounded-sm shadow-[var(--shadow-boutique)] h-[calc(100vh-166px)] overflow-auto scroll-smooth custom-scrollbar"
        >
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 py-40">
              <div className="w-12 h-12 border-2 border-[#B59E6B] border-t-transparent animate-spin rounded-full" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59E6B]">Sincronizando...</p>
            </div>
          ) : (
            <table className="min-w-max border-separate border-spacing-0 table-auto w-full">
              <thead className="sticky top-0 z-40 bg-[#FDFCFB] dark:bg-[#1E1B18]">
                <TrCalendario days={days || []} scrollContainerRef={scrollContainerRef} todayRef={todayRef} />
              </thead>
              <tbody className="divide-y divide-[#B59E6B]/5">
                {habitaciones?.map((hab, index) => (
                  <TrHabitacionCalendario key={hab.id} clientes={clientes ?? []} days={days} habitacion={hab} index={index} reservas={reservas ?? []} handleReserva={handleReserva} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {isDetalleOpen && <DetallesReserva />}
      {isModalOpen && <ModalCalendario />}
    </div>
  );
};
