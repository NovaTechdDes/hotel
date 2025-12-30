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
  }, [day, habitacion, reservas, clientes]);

  if (!reservaAux) return;

  return (
    <td
      id={reservaAux.id}
      key={day.toISOString()}
      onClick={(e) => handleReserva(e, day, habitacion?.id ?? '')}
      className={`border h-10 w-20 text-center hover:bg-gray-200 cursor-pointer `}
      style={{ backgroundColor: `${reservaAux.fondo}` }}
    >
      {(() => {
        const clientName = reservaAux.cliente;
        if (clientName && clientName.length > 14) {
          return <p className="text-white p-1 ca0pitalize">{clientName.slice(0, 14)}...</p>;
        }
        return <p className="text-white p-1 capitalize">{clientName}</p>;
      })()}
    </td>
  );
};
