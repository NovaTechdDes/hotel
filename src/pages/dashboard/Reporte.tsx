import { ReporteMensual } from '../../components/dashboard/reporte/ReporteMensual';
import { ReporteOcupacion } from '../../components/dashboard/reporte/ReporteOcupacion';

export const Reporte = () => {
  return (
    <div className="text-black p-10">
      <div>
        <h2 className="text-3xl font-semibold text-black dark:text-white">Reportes</h2>
        <p className="text-gray-500 mt-2 dark:text-gray-400">Analisis de ingresos y estadisticas de ocupacion de hotel</p>
      </div>

      <div className=" p-3 rounded-lg mt-5">
        <ReporteMensual />

        <ReporteOcupacion />
      </div>
    </div>
  );
};
