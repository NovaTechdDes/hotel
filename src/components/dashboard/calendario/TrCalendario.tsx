import React, { useEffect } from 'react';
import { formatearAString } from '../../../helpers/formatearFecha';
import { format } from 'date-fns';

interface Props {
  days: Date[];
  todayRef: React.RefObject<HTMLTableCellElement | null>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const TrCalendario = ({ days, scrollContainerRef, todayRef }: Props) => {
  useEffect(() => {
    if (todayRef?.current) {
      scrollContainerRef?.current?.scrollTo({ left: todayRef.current.offsetLeft - 200, behavior: 'smooth' });
    }
  }, [days, scrollContainerRef, todayRef]);

  return (
    <tr className="border-b-2 border-[#B59E6B]/20">
      <th className="bg-[#2D2926] dark:bg-[#1E1B18] border-r border-b border-[#B59E6B]/20 p-4 sticky left-0 z-50 text-[9px] uppercase tracking-[0.3em] font-bold text-[#B59E6B] min-w-[150px] text-left shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)]">
        Habitación
      </th>
      {days.map((day) => {
        if (!day) return null;
        const isToday = formatearAString(new Date()).slice(0, 10) === formatearAString(day).slice(0, 10);

        return (
          <th
            key={day.toISOString()}
            ref={isToday ? todayRef : null}
            className={`
                min-w-[100px] p-0 border-r border-b border-[#B59E6B]/20 transition-colors duration-500
                ${isToday ? 'bg-[#B59E6B]/10' : 'bg-transparent'}
            `}
          >
            <div
              className={`
                flex flex-col items-center py-3 border-t-2 transition-all duration-500
                ${isToday ? 'border-[#B59E6B]' : 'border-transparent'}
            `}
            >
              <span className={`text-[9px] uppercase tracking-widest font-bold ${isToday ? 'text-[#B59E6B]' : 'text-[#2D2926]/30 dark:text-[#FDFCFB]/20'}`}>
                {format(day, 'EEE', { locale: undefined }).toUpperCase()}
              </span>
              <span className={`text-sm font-serif ${isToday ? 'text-[#B59E6B]' : 'text-[#2D2926] dark:text-[#FDFCFB]'} tracking-widest`}>{format(day, 'dd/MM')}</span>
            </div>
          </th>
        );
      })}
    </tr>
  );
};

export default TrCalendario;
