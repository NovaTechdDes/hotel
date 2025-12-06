import { AiOutlinePercentage } from 'react-icons/ai';
import { Ocupacion } from './Ocupacion';
import { useReporteOcupacion } from '../../../hooks/reporte/useReporteOcupacion';
import { Loading } from '../../ui/Loading';
import { useReporteTemporadaBaja } from '../../../hooks/reporte/useReporteTemporadaBaja';
import { useState } from 'react';

const anio = new Date().getFullYear();

export const ReporteOcupacion = () => {
  const [year, setYear] = useState<string>(anio.toString());

  const { data: temporadaAlta } = useReporteOcupacion(parseInt(year));
  const { data: temporadaBaja } = useReporteTemporadaBaja(parseInt(year));

  if (!temporadaAlta || !temporadaBaja)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading text="Cargando reporte de ocupacion" />
      </div>
    );

  return (
    <div className="border bg-white p-5 border-gray-300 shadow-2xl rounded-lg dark:bg-gray-800">
      <div className="grid grid-cols-2 gap-5 ">
        <div>
          <div className="flex gap-2 items-center">
            <AiOutlinePercentage color="blue" className="font-semibold" />
            <h2 className="text-2xl font-bold dark:text-white">Reporte de Ocupacion</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Analisis de ocupacion en temporada alta y baja</p>
        </div>

        <div className="flex items-center flex-col mx-5 dark:bg-gray-800">
          <label htmlFor="year" className="font-bold dark:text-white">
            Seleccionar Año
          </label>
          <select name="year" className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xl dark:text-white" id="year" onChange={(e) => setYear(e.target.value)} value={year}>
            <option value={anio - 5}>{anio - 5}</option>
            <option value={anio - 4}>{anio - 4}</option>
            <option value={anio - 3}>{anio - 3}</option>
            <option value={anio - 2}>{anio - 2}</option>
            <option value={anio - 1}>{anio - 1}</option>
            <option value={anio}>{anio}</option>
            <option value={anio + 1}>{anio + 1}</option>
            <option value={anio + 2}>{anio + 2}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-5">
        <Ocupacion title="Temporada alta" color="#ff6900" meses={['Enero', 'Febrero', 'Julio']} temporadaAlta={temporadaAlta} />
        <Ocupacion title="Temporada baja" color="#0069ff" meses={['Marzo', 'Abril', 'Mayo', 'Junio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']} temporadaAlta={temporadaBaja} />
      </div>
    </div>
  );
};
