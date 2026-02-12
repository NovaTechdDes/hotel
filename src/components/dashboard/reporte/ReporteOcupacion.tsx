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
      <div className="min-h-[400px] flex items-center justify-center">
        <Loading text="Sincronizando Estadísticas..." />
      </div>
    );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#B59E6B]/10 pb-6">
        <div>
          <div className="flex gap-3 items-center mb-1">
            <h2 className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB]">Análisis de Ocupación</h2>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#2D2926] dark:text-[#B59E6B] font-bold">Frecuencia de Huéspedes por Temporada</p>
        </div>

        <div className="flex flex-col space-y-1.5 min-w-[140px]">
          <span className="text-[9px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold ml-1">Ejercicio</span>
          <select
            name="year"
            className="bg-transparent border border-black dark:border-[#B59E6B]/20 rounded-sm px-4 py-2 text-xs uppercase tracking-widest text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all cursor-pointer"
            id="year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            {[anio - 2, anio - 1, anio, anio + 1].map((y) => (
              <option key={y} className="bg-[#FDFCFB] dark:bg-[#2D2926]" value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Ocupacion title="Temporada Alta" color="#B59E6B" meses={['Ene', 'Feb', 'Jul']} temporadaAlta={temporadaAlta} />
        <Ocupacion title="Temporada Baja" color="#2D2926" meses={['Mar', 'Abr', 'May', 'Jun', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']} temporadaAlta={temporadaBaja} />
      </div>
    </div>
  );
};
