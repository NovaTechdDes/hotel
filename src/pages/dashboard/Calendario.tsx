// CalendarioHotel.tsx
import type { Cliente, Habitacion, Reserva } from '../../interface';
import { format, setMonth } from 'date-fns';
import { useClientes, useHabitaciones } from '../../hooks';

import { useReservaStore } from '../../store/reserva.store';

import { useReservas } from '../../hooks/reserva/useReservas';

import { formatearAString } from '../../helpers/formatearFecha';
import { DetallesReserva, HeaderCalendario, ModalCalendario } from '../../components';
import { useEffect, useRef, useState } from 'react';
import { traerDiasDelMes } from '../../helpers/traerDiasDelMes';
import { useCalendarioStore } from '../../store/calendario.store';

const devolverReserva = (reservas: Reserva[], day: Date, hab: Habitacion, clientes: Cliente[] = []) => {
  const reserva = reservas?.find((elem) => {
    if (elem.checkin.slice(0, 10) <= formatearAString(day).slice(0, 10) && elem.checkout.slice(0, 10) >= formatearAString(day).slice(0, 10) && elem.habitacionid === hab.id) return elem;
  });
  if (reserva) {
    return {
      id: reserva.id,
      fondo: `${!reserva?.color ? '#3e3e3e' : reserva.color}`,
      cliente: clientes.find((elem) => elem.id === reserva.idcliente)?.nombre || reserva.cliente_nombre,
    };
  } else if (formatearAString(new Date()).slice(0, 10) === formatearAString(day).slice(0, 10)) {
    return {
      id: '',
      fondo: '#acd4ea',
    };
  } else {
    return {
      id: '',
      fondo: '',
    };
  }
};

export const Calendario = () => {
  const { mesSeleccionado } = useCalendarioStore();

  const [days, setDays] = useState(traerDiasDelMes(new Date()));
  const { isModalOpen, openDetalle, openModal, isDetalleOpen } = useReservaStore();
  const { data: reservas } = useReservas();
  const { data: habitaciones } = useHabitaciones();
  const { data: clientes } = useClientes();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLTableCellElement>(null);

  const handleReserva = (e: React.MouseEvent<HTMLTableCellElement>, day: Date) => {
    const target = e.currentTarget as HTMLTableCellElement;
    if (target.id === '') {
      openModal(formatearAString(day).slice(0, 10));
    } else {
      openDetalle(reservas?.find((reserva) => reserva.id === target.id));
    }
  };

  useEffect(() => {
    const date = setMonth(new Date(), mesSeleccionado);
    setDays(traerDiasDelMes(date));
  }, [mesSeleccionado]);

  //Ejecutamos este useefect para mover el foco del scroll al dia actual
  useEffect(() => {
    if (todayRef.current) {
      scrollContainerRef.current?.scrollTo({ left: todayRef.current.offsetLeft, behavior: 'smooth' });
    }
  }, [days]);

  return (
    <>
      <HeaderCalendario />
      <div ref={scrollContainerRef} className="overflow-x-auto border mx-2 rounded-md text-black h-[calc(100vh-128px)] bg-white">
        <table className="min-w-max border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100 sticky left-0">Habitación</th>
              {days.map((day) => (
                <th
                  key={day.toISOString()}
                  ref={formatearAString(new Date()).slice(0, 10) === formatearAString(day).slice(0, 10) ? todayRef : null}
                  style={{ backgroundColor: `${formatearAString(new Date()).slice(0, 10) === formatearAString(day).slice(0, 10) ? '#acd4ea' : ''}` }}
                  className="border p-2 text-sm text-center"
                >
                  {format(day, 'dd/MM')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habitaciones?.map((hab) => (
              <tr key={hab.id}>
                <td className="border p-2 bg-gray-50 sticky left-0">
                  <div>
                    <p className="font-semibold">{hab.nombre}</p>
                    <span className="text-gray-500 text-xs">{hab.tipo}</span>
                  </div>
                </td>
                {days?.map((day) => (
                  <td
                    id={devolverReserva(reservas ?? [], day, hab, clientes!).id}
                    key={day.toISOString()}
                    onClick={(e) => handleReserva(e, day)}
                    className={`border h-10 w-20 text-center hover:bg-gray-200 cursor-pointer `}
                    style={{ backgroundColor: `${devolverReserva(reservas ?? [], day, hab, clientes!).fondo}` }}
                  >
                    <p className="text-white capitalize">{devolverReserva(reservas ?? [], day, hab, clientes!).cliente}</p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDetalleOpen && <DetallesReserva />}
      {isModalOpen && <ModalCalendario />}
    </>
  );
};
