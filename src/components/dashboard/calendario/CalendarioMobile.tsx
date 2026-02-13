import { useEffect, useState } from 'react';
import { HeaderCalendario } from './HeaderCalendario';
import { traerDiasDelMes } from '../../../helpers/traerDiasDelMes';
import { useCalendarioStore } from '../../../store/calendario.store';
import { TrCalendarioMobile } from './TrCalendarioMobile';
import { TrHabitacionCalendarioMobile } from './TrHabitacionCalendarioMobile';
import { setMonth, setYear } from 'date-fns';
import { ReservaCardMobile } from './ReservaCardMobile';
import type { Reserva } from '../../../interface';
import { ModalListCalendario } from './ModalListCalendario';
import { ModalCalendario } from './ModalCalendario';
import { useReservaStore } from '../../../store/reserva.store';

interface Props {
  reservas: Reserva[];
}

export const CalendarioMobile = ({ reservas }: Props) => {
  const { mesSeleccionado, anioSeleccionado, modalListaCalendario } = useCalendarioStore();
  const { isDetalleOpen } = useReservaStore();
  const [days, setDays] = useState(traerDiasDelMes(new Date()));

  useEffect(() => {
    console.log(isDetalleOpen);
  }, [isDetalleOpen]);

  const reservasMes = reservas.filter((reserva) => reserva.checkin.slice(5, 7) === (mesSeleccionado + 1).toString().padStart(2, '0'));

  useEffect(() => {
    const date = setMonth(new Date(), mesSeleccionado);
    const year = setYear(date, anioSeleccionado);
    setDays(traerDiasDelMes(year));
  }, [mesSeleccionado, anioSeleccionado]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-[#1E1B18]">
      <HeaderCalendario />

      <div className="px-3 sm:px-4 py-4">
        <div id="calendarioMobile" className="overflow-x-auto border border-[#B59E6B]/10 rounded-sm bg-white dark:bg-[#2D2926] shadow-[var(--shadow-boutique)] h-[calc(100vh-200px)]">
          <table className="w-full border-collapse h-full">
            <thead className="text-xs bg-[#FDFCFB] dark:bg-[#1E1B18] sticky top-0 z-10">
              <TrCalendarioMobile />
            </thead>
            <tbody className="text-xs divide-y divide-[#B59E6B]/5">
              {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => {
                const weekDays = days.slice(weekIndex * 7, weekIndex * 7 + 7);

                return (
                  <tr key={weekIndex}>
                    {weekDays.map((day, i) => (
                      <TrHabitacionCalendarioMobile key={i} day={day?.getDate() || 0} reservasMes={reservasMes} />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pb-6">
          <h3 className="text-lg font-serif text-[#88754e] dark:text-[#B59E6B] border-b border-[#B59E6B]/20 pb-2 mb-4">Reservas este mes</h3>
          <div className="space-y-3">
            {reservasMes?.length > 0 ? (
              reservasMes.map((reserva) => <ReservaCardMobile key={reserva.id} reserva={reserva} />)
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-[#2D2926]/40 dark:text-[#FDFCFB]/30 italic">No hay reservas para este mes</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalListaCalendario && <ModalListCalendario />}
      {isDetalleOpen && <ModalCalendario />}
    </div>
  );
};
