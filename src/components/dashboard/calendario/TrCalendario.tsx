import React, { useEffect } from 'react';
import { formatearAString } from '../../../helpers/formatearFecha';
import { format } from 'date-fns';
import { useTheme } from '../../../hooks/ui/usetheme';

interface Props {
  days: Date[];
  todayRef: React.RefObject<HTMLTableCellElement | null>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const TrCalendario = ({ days, scrollContainerRef, todayRef }: Props) => {
  const { theme } = useTheme();

  const color = theme === 'dark' ? '#266282' : 'acd4ea';

  //Ejecutamos este useefect para mover el foco del scroll al dia actual
  useEffect(() => {
    if (todayRef?.current) {
      scrollContainerRef?.current?.scrollTo({ left: todayRef.current.offsetLeft, behavior: 'smooth' });
    }
  }, [days]);

  return (
    <tr>
      <th className="border p-2 bg-gray-100 sticky left-0">Habitación</th>
      {days.map((day) =>
        !day ? null : (
          <th
            key={day?.toISOString()}
            ref={formatearAString(new Date()).slice(0, 10) === formatearAString(day).slice(0, 10) ? todayRef : null}
            style={{ backgroundColor: `${formatearAString(new Date()).slice(0, 10) === formatearAString(day).slice(0, 10) ? color : ''}` }}
            className="border p-2 text-sm text-center dark:bg-gray-600 dark:text-white dark:border-gray-400"
          >
            {format(day, 'dd/MM')}
          </th>
        )
      )}
    </tr>
  );
};

export default TrCalendario;
