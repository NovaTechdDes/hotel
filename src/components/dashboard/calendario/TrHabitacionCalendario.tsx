import React from 'react';

import type { Cliente, Habitacion, Reserva } from '../../../interface';
import { TdCeldaReserva } from './TdCeldaReserva';

interface Props {
  habitacion: Habitacion;
  index: number;
  days: Date[];
  reservas: Reserva[];
  clientes: Cliente[];
  handleReserva: (e: React.MouseEvent<HTMLTableCellElement>, day: Date, habitacionId: string) => void;
}

export const TrHabitacionCalendario = ({ habitacion, days, reservas, clientes, handleReserva }: Props) => {
  return (
    <tr key={habitacion.id} className="group hover:bg-[#B59E6B]/5 transition-colors border-b border-[#B59E6B]/20">
      <td className="sticky left-0 z-30 bg-[#FDFCFB] dark:bg-[#1E1B18] border-r border-[#B59E6B]/20 p-4 min-w-[150px] transition-colors duration-500 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-start gap-1">
          <p className="text-[11px] font-serif text-[#2D2926] dark:text-[#FDFCFB] leading-none tracking-wide group-hover:text-[#B59E6B] transition-colors">{habitacion.nombre}</p>
          <span className="text-[8px] uppercase tracking-widest font-bold text-[#B59E6B] opacity-60">{habitacion.tipo}</span>
        </div>
      </td>
      {days?.map((day) => (!day ? null : <TdCeldaReserva key={day.toISOString()} day={day} habitacion={habitacion} reservas={reservas} clientes={clientes} handleReserva={handleReserva} />))}
    </tr>
  );
};
