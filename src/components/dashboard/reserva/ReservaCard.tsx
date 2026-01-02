import { useReservaStore } from '../../../store/reserva.store';
import { reordenarFecha } from '../../../helpers/formatearFecha';

import type { Reserva } from '../../../interface';
import { HiOutlineCalendar, HiOutlinePencilSquare } from 'react-icons/hi2';
import { LuBed } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface Props {
  reserva: Reserva;
  buscador: string;
}

export const ReservaCard = ({ buscador, reserva }: Props) => {
  const { cliente, color, habitacion, checkin, checkout } = reserva;
  const { openDetalle } = useReservaStore();

  const handleReserva = () => {
    openDetalle(reserva);
  };

  if (!cliente?.nombre.toUpperCase().startsWith(buscador.toUpperCase()) && !habitacion?.nombre.toUpperCase().startsWith(buscador.toUpperCase())) {
    return;
  }

  if (!reserva.mostrar) {
    return;
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between mb-5 border-b border-gray-400 pb-2">
      <div className="flex gap-5 ">
        <div className="md:w-15 md:h-15 w-10 h-10 text-white flex items-center justify-center rounded-lg" style={{ backgroundColor: color }}>
          {reserva.idcliente ? cliente?.nombre[0] : reserva.cliente_nombre[0]}
          {reserva.idcliente ? cliente?.nombre.split(' ', 2)?.[1]?.[0] : reserva.cliente_nombre.split(' ', 2)?.[1]?.[0]}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="dark:text-white">{cliente?.nombre ? cliente.nombre : reserva.cliente_nombre}</p>
            <p className="text-gray-500 dark:text-gray-200 dark:bg-gray-600 rounded-lg px-2 capitalize">{habitacion?.tipo}</p>
          </div>
          <p className="flex items-center gap-5">
            <LuBed className="hidden md:block dark:text-gray-200" />
            <span className="text-gray-500 dark:text-gray-200">Habitacion {habitacion?.nombre}</span>
          </p>
        </div>
      </div>

      <div className="flex items-end gap-2 justify-center text-gray-500">
        <HiOutlineCalendar size={20} className="dark:text-gray-200" />
        <p className="dark:text-gray-200">
          {reordenarFecha(checkin)} - {reordenarFecha(checkout)}
        </p>
      </div>

      <div className="flex gap-5 md:w-auto w-full items-center dark:text-gray-300">
        <Link to={'https://fe.afip.gob.ar/rcel/jsp/index_bis.jsp'} target="_blank" className="cursor-pointer hover:bg-gray-200 rounded-lg px-2 dark:hover:bg-gray-600">
          <IoDocumentTextOutline title="Realizar Factura" size={20} />
        </Link>

        <button
          className="inline-flex w-full justify-center items-center text-xs md:text-base gap-2 cursor-pointer hover:bg-blue-700 bg-blue-600 text-white border border-gray-300 rounded-lg p-2  dark:border-gray-600"
          onClick={handleReserva}
        >
          <HiOutlinePencilSquare className="hidden md:block" />
          Ver Detalles
        </button>
      </div>
    </div>
  );
};
