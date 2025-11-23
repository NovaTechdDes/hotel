import { AiOutlinePercentage } from 'react-icons/ai';
import { Ocupacion } from './Ocupacion';
import { useReporteOcupacion } from '../../../hooks/reporte/useReporteOcupacion';
import { Loading } from '../../ui/Loading';
import { useReporteTemporadaBaja } from '../../../hooks/reporte/useReporteTemporadaBaja';

export const ReporteOcupacion = () => {
  const { data: temporadaAlta } = useReporteOcupacion(2025);
  const { data: temporadaBaja } = useReporteTemporadaBaja(2025);

  if (!temporadaAlta || !temporadaBaja) return <Loading text="Cargando reporte de ocupacion" />;

  return (
    <div className="border bg-white p-5 border-gray-300 shadow-2xl rounded-lg">
      <div className="flex gap-2 items-center">
        <AiOutlinePercentage color="blue" className="font-semibold" />
        <h2 className="text-2xl font-bold">Reporte de Ocupacion</h2>
      </div>
      <p className="text-gray-500">Analisis de ocupacion en temporada alta y baja</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-5">
        <Ocupacion title="Temporada alta" color="#ff6900" meses={['Enero', 'Febrero', 'Julio']} temporadaAlta={temporadaAlta} />
        <Ocupacion title="Temporada baja" color="#0069ff" meses={['Marzo', 'Abril', 'Mayo', 'Junio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']} temporadaAlta={temporadaBaja} />
      </div>
    </div>
  );
};
