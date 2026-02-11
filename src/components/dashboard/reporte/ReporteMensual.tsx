import { useState } from 'react';
import { TarjetaReporte } from './TarjetaReporte';
import { HiArrowTrendingUp, HiOutlineCalendar } from 'react-icons/hi2';
import { useReportesMonthAndYear } from '../../../hooks/reporte/useReportesMonthAndYear';
import { VscGraph } from 'react-icons/vsc';
import { calcularDias } from '../../../helpers/formatearFecha';

const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();
const meses: { value: number; text: string }[] = [
  { value: 1, text: 'Enero' },
  { value: 2, text: 'Febrero' },
  { value: 3, text: 'Marzo' },
  { value: 4, text: 'Abril' },
  { value: 5, text: 'Mayo' },
  { value: 6, text: 'Junio' },
  { value: 7, text: 'Julio' },
  { value: 8, text: 'Agosto' },
  { value: 9, text: 'Septiembre' },
  { value: 10, text: 'Octubre' },
  { value: 11, text: 'Noviembre' },
  { value: 12, text: 'Diciembre' },
];

export const ReporteMensual = () => {
  const [mes, setMes] = useState<string>(month.toString());
  const [anio, setAnio] = useState<string>(year.toString());

  const { data: reservasMes = [] } = useReportesMonthAndYear(parseInt(mes), parseInt(anio));
  const totalIngresos = reservasMes.length !== 0 ? reservasMes.reduce((suma, reserva) => suma + (reserva.importe ?? 0) * calcularDias(reserva.checkin, reserva.checkout), 0) : 0;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#B59E6B]/10 pb-6">
        <div>
          <h3 className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB]">Ingresos Mensuales</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#B59E6B] mt-1 font-bold">Rendimiento Operativo</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="space-y-1.5 flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold ml-1">Periodo</span>
            <select
              className="bg-transparent border border-[#B59E6B]/20 rounded-sm px-4 py-2 text-xs uppercase tracking-widest text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all cursor-pointer"
              onChange={(e) => setMes(e.target.value)}
              name="mes"
              value={mes}
              id="mes"
            >
              {meses.map((elem) => (
                <option value={elem.value} key={elem.value} className="text-[#2D2926] bg-[#FDFCFB] dark:text-[#FDFCFB] dark:bg-[#2D2926]">
                  {elem.text}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold ml-1">Año Fiscal</span>
            <select
              className="bg-transparent border border-[#B59E6B]/20 rounded-sm px-4 py-2 text-xs uppercase tracking-widest text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all cursor-pointer"
              name="anio"
              onChange={(e) => setAnio(e.target.value)}
              value={anio}
              id="anio"
            >
              <option value={year - 2} className="bg-[#FDFCFB] dark:bg-[#2D2926]">
                {year - 2}
              </option>
              <option value={year - 1} className="bg-[#FDFCFB] dark:bg-[#2D2926]">
                {year - 1}
              </option>
              <option value={year} className="bg-[#FDFCFB] dark:bg-[#2D2926]">
                {year}
              </option>
              <option value={year + 1} className="bg-[#FDFCFB] dark:bg-[#2D2926]">
                {year + 1}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TarjetaReporte title="Reservas Confirmadas" Icon={HiOutlineCalendar} colorIcon="#B59E6B" numero={reservasMes.length.toString()} text="Volumen de Huéspedes" />
        <TarjetaReporte
          title="Ingresos Brutos"
          Icon={HiArrowTrendingUp}
          colorIcon="#B59E6B"
          numero={`$${totalIngresos.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          text="Recaudación Bruta"
        />
        <TarjetaReporte
          title="Ingreso por Reserva"
          Icon={VscGraph}
          colorIcon="#B59E6B"
          numero={`$${reservasMes.length !== 0 ? (totalIngresos / reservasMes.length).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}`}
          text="Ticket Promedio"
        />
      </div>
    </div>
  );
};
