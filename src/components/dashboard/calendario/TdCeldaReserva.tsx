import React from 'react';
import { devolverReserva } from '../../../helpers/devolverReserva';
import type { Cliente, Habitacion, Reserva } from '../../../interface';

interface Props {
  day: Date;
  habitacion: Habitacion;
  reservas: Reserva[];
  clientes: Cliente[];
  handleReserva: (e: React.MouseEvent<HTMLTableCellElement>, day: Date, habitacionId: string) => void;
}

export const TdCeldaReserva = ({ day, habitacion, reservas, clientes, handleReserva }: Props) => {
  return (
    <td
      id={devolverReserva(reservas ?? [], day, habitacion, clientes!).id}
      key={day.toISOString()}
      onClick={(e) => handleReserva(e, day, habitacion?.id ?? '')}
      className={`border h-10 w-20 text-center hover:bg-gray-200 cursor-pointer `}
      style={{ backgroundColor: `${devolverReserva(reservas ?? [], day, habitacion, clientes!).fondo}` }}
    >
      {(() => {
        const reservaData = devolverReserva(reservas ?? [], day, habitacion, clientes!);
        const clientName = reservaData.cliente;
        if (clientName && clientName.length > 14) {
          return <p className="text-white p-1 ca0pitalize">{clientName.slice(0, 14)}...</p>;
        }
        return <p className="text-white p-1 capitalize">{clientName}</p>;
      })()}
    </td>
  );
};
