import { useCalendarioStore } from '../../../store/calendario.store';
import { useReservas } from '../../../hooks/reserva/useReservas';
import { ReservaCard } from '../reserva/ReservaCard';
import { CgClose } from 'react-icons/cg';
import { useEffect, useState } from 'react';

export const ModalListCalendario = () => {
  const { mesSeleccionado, anioSeleccionado, setModalListaCalendario, diaListaCalendario } = useCalendarioStore();
  const { data: reservasMes } = useReservas(mesSeleccionado, anioSeleccionado);
  const [reservasDia, setReservasDia] = useState(reservasMes?.filter((reserva) => reserva.checkin.slice(8, 10) === diaListaCalendario));

  useEffect(() => {
    setReservasDia(reservasMes?.filter((reserva) => reserva.checkin.slice(8, 10) === diaListaCalendario));
  }, [diaListaCalendario, reservasMes]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1E1B18]/90 backdrop-blur-sm z-50 animate-in fade-in duration-300 px-4">
      <div className="bg-[#FDFCFB] dark:bg-[#2D2926] shadow-2xl w-full max-w-4xl rounded-sm p-10 border border-[#B59E6B] transition-all duration-500 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b border-[#B59E6B]/20 pb-2 mb-4">
          <h3 className="text-lg font-serif text-[#88754e] dark:text-[#B59E6B]">
            Reservas este {diaListaCalendario.padStart(2, '0')}/{(mesSeleccionado + 1).toString().padStart(2, '0')}/{anioSeleccionado}
          </h3>
          <CgClose
            className="cursor-pointer text-white"
            size={24}
            onClick={() => {
              setModalListaCalendario(false);
            }}
          />
        </div>
        <div className="space-y-3">
          {reservasDia?.length ? (
            reservasDia?.map((reserva) => <ReservaCard key={reserva.id} reserva={reserva} buscador="" />)
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-[#2D2926]/40 dark:text-[#FDFCFB]/30 italic">No hay reservas para este mes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
