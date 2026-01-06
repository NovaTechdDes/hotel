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

export const TrHabitacionCalendario = ({ habitacion, index, days, reservas, clientes, handleReserva }: Props) => {
  return (
    <tr key={habitacion.id} className="">
      <td className={`border border-gray-800 sticky left-0 align-middle p-0 ${index < 3 ? 'bg-amber-200' : index < 11 ? 'bg-pink-200' : 'bg-green-200'}`}>
        <div className={` flex flex-col items-center  min-h-[2rem] h-full`}>
          <p className="font-semibold text-xs leading-none">{habitacion.nombre}</p>
          <span className="text-gray-500 text-xs leading-none">{habitacion.tipo}</span>
        </div>
      </td>
      {days?.map((day) => (!day ? null : <TdCeldaReserva key={day.toISOString()} day={day} habitacion={habitacion} reservas={reservas} clientes={clientes} handleReserva={handleReserva} />))}
    </tr>
  );
};
