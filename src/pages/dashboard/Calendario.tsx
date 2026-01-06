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
  const { data: reservas } = useReservas();
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

  //Ejecutamos este useefect para mover el foco del scroll al dia actual
  useEffect(() => {
    if (todayRef.current) {
      scrollContainerRef.current?.scrollTo({ left: todayRef.current.offsetLeft, behavior: 'smooth' });
    }
  }, [days]);

  const isMobile = useIsMobile();

  if (isMobile && reservas) {
    return <CalendarioMobile reservas={reservas} />;
  }

  return (
    <>
      <HeaderCalendario />
      <div ref={scrollContainerRef} className="overflow-x-auto border mx-2 rounded-md text-black h-[calc(100vh-75px)] bg-white">
        <table className="min-w-max border-collapse table-auto">
          <thead>
            <TrCalendario days={days || []} scrollContainerRef={scrollContainerRef} todayRef={todayRef} />
          </thead>
          <tbody className="h-full">
            {habitaciones?.map((hab, index) => (
              <TrHabitacionCalendario key={hab.id} clientes={clientes ?? []} days={days} habitacion={hab} index={index} reservas={reservas ?? []} handleReserva={handleReserva} />
            ))}
          </tbody>
        </table>
      </div>
      {isDetalleOpen && <DetallesReserva />}
      {isModalOpen && <ModalCalendario />}
    </>
  );
};
