import type { Reserva } from '../../../interface';

interface Props {
  reserva: Reserva;
}

export const ReservaCardMobile = ({ reserva }: Props) => {
  if (!reserva.mostrar) {
    return null;
  }
  return (
    <div key={reserva.id} className="flex gap-5 border border-gray-500 rounded-lg p-2 items-center mx-10">
      <div className="w-10 h-10 text-white flex items-center justify-center rounded-lg " style={{ backgroundColor: reserva.color }}>
        {reserva.idcliente ? reserva.cliente?.nombre?.split(' ', 2)?.[0]?.[0] : reserva.cliente_nombre?.split(' ', 2)?.[0]?.[0]}
        {reserva.idcliente ? reserva.cliente?.nombre?.split(' ', 2)?.[1]?.[0] : reserva.cliente_nombre?.split(' ', 2)?.[1]?.[0]}
      </div>
      <div className="flex flex-col">
        <div>
          <p className="text-xl dark:text-white font-semibold">{reserva.idcliente ? reserva.cliente?.nombre : reserva.cliente_nombre}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-500">Habitacion: {reserva.habitacion?.nombre}</p>
          <p className="text-gray-500">
            {reserva.checkin.slice(0, 10)} - {reserva.checkout.slice(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
};
