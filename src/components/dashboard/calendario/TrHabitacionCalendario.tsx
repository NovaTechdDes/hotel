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
      <td className="border bg-gray-50 sticky left-0">
        <div className={`border-r p-2 border-gray-800 ${index < 3 ? 'bg-amber-200' : index < 11 ? 'bg-pink-200' : 'bg-green-200'}`}>
          <p className="font-semibold">{habitacion.nombre}</p>
          <span className="text-gray-500 text-xs">{habitacion.tipo}</span>
        </div>
      </td>
      {days?.map((day) => (!day ? null : <TdCeldaReserva key={day.toISOString()} day={day} habitacion={habitacion} reservas={reservas} clientes={clientes} handleReserva={handleReserva} />))}
    </tr>
  );
};
