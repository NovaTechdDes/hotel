import { reordenarFecha } from '../../../helpers/formatearFecha';
import type { Reserva } from '../../../interface';

interface Props {
  day: number;
  reservasMes: Reserva[];
}

export const TrHabitacionCalendarioMobile = ({ day, reservasMes }: Props) => {
  if (!reservasMes) return null;

  const reservasDelDia = reservasMes?.filter((reserva) => reordenarFecha(reserva.checkin).slice(0, 2) <= day.toString() && reordenarFecha(reserva.checkout).slice(0, 2) > day.toString());
  if (day === 0) {
    return <td></td>;
  }

  return (
    <td className="text-center ">
      <div className="border border-gray-500 m-1 px-1 py-5 rounded-lg dark:hover:bg-gray-700 cursor-pointer items-center flex flex-col gap-2">
        <p className={`font-semibold   ${day === new Date().getDate() ? 'dark:bg-gray-200   rounded-full dark:text-black' : ''} flex items-center w-8 h-8 p-1  justify-center`}>{day}</p>
        <div className="flex justify-center items-center gap-2">
          {reservasDelDia.map((reserva) => (
            <p key={reserva.id} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reserva.color }}></p>
          ))}
        </div>
      </div>
    </td>
  );
};
