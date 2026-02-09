import { ReporteMensual } from '../../components/dashboard/reporte/ReporteMensual';
import { ReporteOcupacion } from '../../components/dashboard/reporte/ReporteOcupacion';

export const Reporte = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-[#1E1B18] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12 border-b border-[#B59E6B]/10 pb-8">
          <h2 className="text-4xl font-serif font-light tracking-tight text-[#2D2926] dark:text-[#FDFCFB]">Analítica de Negocio</h2>
          <p className="mt-2 text-[#2D2926]/60 dark:text-[#FDFCFB]/50 font-sans tracking-wide uppercase text-[10px] letter-spacing-[0.2em]">
            Estadísticas de ocupación, rendimientos mensuales y proyecciones de hotel
          </p>
        </header>

        <div className="space-y-16">
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ReporteMensual />
          </section>

          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 border-t border-[#B59E6B]/10 pt-16">
            <ReporteOcupacion />
          </section>
        </div>
      </div>
    </div>
  );
};
