import React, { useEffect, useState } from 'react';
import { devolverReserva } from '../../../helpers/devolverReserva';
import type { Cliente, Habitacion, Reserva } from '../../../interface';

interface Props {
  day: Date;
  habitacion: Habitacion;
  reservas: Reserva[];
  clientes: Cliente[];
  handleReserva: (e: React.MouseEvent<HTMLTableCellElement>, day: Date, habitacionId: string) => void;
}

interface ReservaAux {
  id: string;
  fondo: string;
  cliente?: string;
}

export const TdCeldaReserva = ({ day, habitacion, reservas, clientes, handleReserva }: Props) => {
  const [reservaAux, setReservaAux] = useState<ReservaAux | null>(null);

  const handlereserva = async () => {
    const reserva = await devolverReserva(reservas ?? [], day, habitacion, clientes!);
    setReservaAux(reserva);
  };

  useEffect(() => {
    handlereserva();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, habitacion, reservas, clientes]);

  if (!reservaAux) return <td className="p-0 border-r border-[#B59E6B]/5" />;

  const isReservaActual = reservaAux.id !== '';

  return (
    <td
      id={reservaAux.id}
      key={day.toISOString()}
      onClick={(e) => handleReserva(e, day, habitacion?.id ?? '')}
      className={`
        relative p-1.5 min-w-[100px] h-14 border-r border-b border-[#B59E6B]/20 transition-all duration-300
        ${!isReservaActual ? 'hover:bg-[#B59E6B]/5 cursor-pointer' : 'cursor-default'}
      `}
    >
      {isReservaActual ? (
        <div
          className="w-full h-full rounded-sm shadow-sm flex items-center justify-center px-2 animate-in zoom-in-95 duration-500 ring-1 ring-black/5 hover:ring-[#B59E6B]/40 transition-all cursor-pointer overflow-hidden"
          style={{ backgroundColor: reservaAux.fondo }}
          title={reservaAux.cliente}
        >
          <p className="text-[9px] font-serif text-white tracking-widest uppercase truncate font-medium">{reservaAux.cliente?.slice(0, 4)}...</p>
        </div>
      ) : (
        <div className="w-full h-full rounded-sm border border-transparent group-hover/cell:border-[#B59E6B]/20 transition-all" />
      )}
    </td>
  );
};
