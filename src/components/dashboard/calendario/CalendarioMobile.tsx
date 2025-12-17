import { useEffect, useState } from 'react';
import { HeaderCalendario } from './HeaderCalendario';
import { traerDiasDelMes } from '../../../helpers/traerDiasDelMes';
import { useCalendarioStore } from '../../../store/calendario.store';
import { TrCalendarioMobile } from './TrCalendarioMobile';
import { TrHabitacionCalendarioMobile } from './TrHabitacionCalendarioMobile';
import { setMonth, setYear } from 'date-fns';
import { ReservaCardMobile } from './ReservaCardMobile';
import type { Reserva } from '../../../interface';

interface Props {
  reservas: Reserva[];
}

export const CalendarioMobile = ({ reservas }: Props) => {
  const { mesSeleccionado, anioSeleccionado } = useCalendarioStore();
  const [days, setDays] = useState(traerDiasDelMes(new Date()));

  const reservasMes = reservas.filter((reserva) => reserva.checkin.slice(5, 7) === (mesSeleccionado + 1).toString().padStart(2, '0'));

  useEffect(() => {
    const date = setMonth(new Date(), mesSeleccionado);
    const year = setYear(date, anioSeleccionado);
    setDays(traerDiasDelMes(year));
  }, [mesSeleccionado, anioSeleccionado]);

  return (
    <div>
      <HeaderCalendario />

      <div id="calendarioMobile" className="overflow-x-auto border mx-5 rounded-md text-black h-[calc(100vh-128px)] bg-white dark:bg-slate-800 dark:text-white">
        <table className=" w-full border-collapse h-full">
          <thead className="text-xs">
            <TrCalendarioMobile />
          </thead>
          <tbody className="h-full text-xs">
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

      <div className="container mx-auto mt-7 flex flex-col gap-5 mb-10">
        <h3 className="text-xl font-semibold dark:text-white mx-10">Reservas este mes</h3>
        {reservasMes?.map((reserva) => (
          <ReservaCardMobile key={reserva.id} reserva={reserva} />
        ))}
      </div>
    </div>
  );
};
