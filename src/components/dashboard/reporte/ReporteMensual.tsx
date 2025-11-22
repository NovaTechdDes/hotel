import { useState } from 'react';
import { TarjetaReporte } from './TarjetaReporte';
import { HiArrowTrendingUp, HiOutlineCalendar } from 'react-icons/hi2';
import { useReportesMonthAndYear } from '../../../hooks/reporte/useReportesMonthAndYear';
import { VscGraph } from 'react-icons/vsc';

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

  const { data: reservasMes = '' } = useReportesMonthAndYear(parseInt(mes), parseInt(anio));
  const totalIngresos = reservasMes !== '' ? reservasMes.reduce((suma, reserva) => suma + (reserva.importe ?? 0), 0) : 0;

  return (
    <div className="bg-white border p-5 border-gray-300 shadow-2xl rounded-lg mb-5">
      <div>
        <h3 className="text-2xl font-semibold ">Reporte de ingreso Mensual</h3>
        <span className="text-gray-500">Visualiza los ingresos generados por las reservas del mes</span>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="mes0" className="text-lg font-semibold">
            Seleccionar Mes
          </label>
          <select className="border rounded-lg px-2 py-1 text-lg border-gray-300 w-full" onChange={(e) => setMes(e.target.value)} name="mes" value={mes} id="mes">
            {meses.map((elem) => (
              <option value={elem.value} key={elem.value}>
                {elem.text}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="anio" className="text-lg font-semibold">
            Seleccionar Año
          </label>
          <select className="border rounded-lg px-2 py-1 text-lg border-gray-300 w-full" name="anio" onChange={(e) => setAnio(e.target.value)} value={anio} id="anio">
            <option value={year - 5}>{year - 5}</option>
            <option value={year - 4}>{year - 4}</option>
            <option value={year - 3}>{year - 3}</option>
            <option value={year - 2}>{year - 2}</option>
            <option value={year - 1}>{year - 1}</option>
            <option value={year}>{year}</option>
            <option value={year + 1}>{year + 1}</option>
            <option value={year + 2}>{year + 2}</option>
          </select>
        </div>
      </div>

      <div className="md:grid-cols-3 gap-5 grid p-5">
        <TarjetaReporte title="Total de Reservas" Icon={HiOutlineCalendar} colorIcon="blue" numero={reservasMes.length.toString()} text={`${meses[parseInt(mes) - 1].text} ${anio}`} />
        <TarjetaReporte title="Ingreso Totales" Icon={HiArrowTrendingUp} colorIcon="green" numero={`$${totalIngresos.toFixed(2)}`} text={`${meses[parseInt(mes) - 1].text} ${anio}`} />
        <TarjetaReporte
          title="Ingreso Promedio"
          Icon={VscGraph}
          colorIcon="blue"
          numero={`$${reservasMes.length !== 0 ? (totalIngresos / reservasMes.length).toFixed(2) : '0.00'}`}
          text="Por Reserva"
        />
      </div>
    </div>
  );
};
