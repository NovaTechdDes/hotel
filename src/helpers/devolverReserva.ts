import type { Cliente, Habitacion, Reserva } from '../interface';
import { formatearAString } from './formatearFecha';

export const devolverReserva = (reservas: Reserva[], day: Date, hab: Habitacion, clientes: Cliente[] = []) => {
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
