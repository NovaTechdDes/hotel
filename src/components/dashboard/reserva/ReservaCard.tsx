import { useReservaStore } from '../../../store/reserva.store';
import { reordenarFecha } from '../../../helpers/formatearFecha';

import type { Reserva } from '../../../interface';
import { HiOutlineCalendar, HiOutlinePencilSquare } from 'react-icons/hi2';
import { LuBed } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useCalendarioStore } from '../../../store/calendario.store';

interface Props {
  reserva: Reserva;
  buscador: string;
}

export const ReservaCard = ({ buscador, reserva }: Props) => {
  const { cliente, color, habitacion, checkin, checkout, cliente_nombre } = reserva;
  const { openDetalle } = useReservaStore();
  const { setModalListaCalendario } = useCalendarioStore();

  const handleReserva = () => {
    setModalListaCalendario(false);
    openDetalle(reserva);
  };

  const nombreFinal = cliente?.nombre || cliente_nombre;

  if (!nombreFinal.toUpperCase().startsWith(buscador.toUpperCase()) && !habitacion?.nombre.toUpperCase().startsWith(buscador.toUpperCase())) {
    return null;
  }

  if (!reserva.mostrar) {
    return null;
  }

  return (
    <div className="group bg-white dark:bg-[#2D2926] border-b border-[#B59E6B]/10 hover:bg-[#B59E6B]/5 transition-all duration-300 px-6 py-5 flex flex-col md:flex-row gap-6 items-center lg:px-10">
      <div className="flex flex-1 gap-6 items-center w-full">
        <div
          className="w-12 h-12 rounded-full text-white flex items-center justify-center font-serif text-lg shadow-inner shrink-0 group-hover:scale-105 transition-transform"
          style={{ backgroundColor: color || '#B59E6B' }}
        >
          {nombreFinal[0].toUpperCase()}
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h4 className="text-lg font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide capitalize group-hover:text-[#B59E6B] transition-colors">{nombreFinal}</h4>
            <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border border-[#B59E6B]/20 text-[#B59E6B] font-bold bg-[#B59E6B]/5">{habitacion?.tipo}</span>
          </div>

          <div className="flex items-center gap-4 text-[#2D2926]/40 dark:text-[#FDFCFB]/30">
            <div className="flex items-center gap-1.5">
              <LuBed size={14} className="text-[#B59E6B]" />
              <p className="text-[10px] items-center uppercase tracking-widest font-bold">Residencia {habitacion?.nombre}</p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <HiOutlineCalendar size={14} className="text-[#B59E6B]" />
              <p className="text-[10px] items-center uppercase tracking-widest font-bold">
                {reordenarFecha(checkin)} <span className="mx-1 opacity-40">→</span> {reordenarFecha(checkout)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 w-full md:w-auto md:border-l border-[#B59E6B]/10 md:pl-8 pr-4">
        <div className="hidden lg:flex flex-col items-center">
          <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#B59E6B] mb-1 leading-none">Vínculo AFIP</p>
          <Link
            to={'https://auth.afip.gob.ar/contribuyente_/loginClave.xhtml'}
            target="_blank"
            className="p-2 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors"
            title="Realizar Facturación"
          >
            <IoDocumentTextOutline size={22} />
          </Link>
        </div>

        <button
          onClick={handleReserva}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#B59E6B] hover:text-[#2D2926] dark:hover:text-[#FDFCFB] border border-[#B59E6B]/20 px-8 py-3 rounded-sm hover:bg-[#B59E6B]/5 transition-all"
        >
          <HiOutlinePencilSquare size={16} />
          Ficha de Reserva
        </button>
      </div>
    </div>
  );
};
