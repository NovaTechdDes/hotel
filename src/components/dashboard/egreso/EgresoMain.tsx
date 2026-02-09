import { useEgresoPorTipo } from '../../../hooks/egreso/useEgresoPorTipo';
import { ListaEgresos } from './ListaEgresos';
import { Loading } from '../../ui/Loading';

export const EgresoMain = () => {
  const { data: tipoEgresos, isLoading } = useEgresoPorTipo();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <div className="lg:col-span-3">
        <ListaEgresos />
      </div>

      <div className="space-y-8">
        <aside className="bg-white dark:bg-[#2D2926] p-8 rounded-sm border border-[#B59E6B]/10 shadow-[var(--shadow-boutique)] sticky top-8 transition-all duration-500">
          <div className="mb-8 border-b border-[#B59E6B]/10 pb-4">
            <h3 className="text-sm font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">Desglose por Categoría</h3>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#B59E6B] mt-1 font-bold font-sans">Vigilancia Financiera</p>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <Loading text="Calculando Desglose..." />
            ) : (
              tipoEgresos?.map((elem) => (
                <div key={elem.descripcion} className="group flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59E6B] opacity-40 group-hover:opacity-100 transition-opacity" />
                    <p className="text-xs tracking-wide text-[#2D2926]/70 dark:text-[#FDFCFB]/60 group-hover:text-[#2D2926] dark:group-hover:text-[#FDFCFB] transition-colors capitalize">
                      {elem.descripcion}
                    </p>
                  </div>
                  <span className="text-sm font-serif tracking-tight text-[#2D2926] dark:text-[#FDFCFB]">${elem.importe.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                </div>
              ))
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-[#B59E6B]/10 border-dashed">
            <p className="text-[12px] text-[#2D2926]/40 dark:text-[#FDFCFB]/30 leading-relaxed italic">* Los importes se actualizan automáticamente según los registros activos del sistema.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};
