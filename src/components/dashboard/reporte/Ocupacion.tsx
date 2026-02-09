import { AiOutlinePercentage } from 'react-icons/ai';
import type { TemporadaAlta } from '../../../interface';

interface Props {
  title: string;
  color: string;
  temporadaAlta: TemporadaAlta;
  meses: string[];
}

export const Ocupacion = ({ temporadaAlta, color, title, meses }: Props) => {
  if (!temporadaAlta) return null;

  return (
    <div className="group bg-white dark:bg-[#2D2926] p-8 rounded-sm border border-[#B59E6B]/10 shadow-[var(--shadow-boutique)] hover:border-[#B59E6B]/30 transition-all duration-500 relative overflow-hidden">
      <div className="flex justify-between items-start mb-10">
        <div className="space-y-1">
          <h3 className="text-xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">{title}</h3>
          <p className="text-[10px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold">Resumen Estadístico</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5 max-w-[120px]">
          {meses.map((m) => (
            <span key={m} className="text-[8px] uppercase tracking-widest font-bold text-[#B59E6B] bg-[#B59E6B]/5 px-1.5 py-0.5 rounded-sm">
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-end">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#2D2926]/60 dark:text-[#FDFCFB]/40 font-bold">Total Reservas</p>
          <span className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB] leading-none">{temporadaAlta.total_reservas}</span>
        </div>

        <div className="flex justify-between items-end">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#2D2926]/60 dark:text-[#FDFCFB]/40 font-bold">Días Ocupados</p>
          <span className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB] leading-none">{temporadaAlta.total_dias_ocupados}</span>
        </div>

        <div className="pt-6 border-t border-[#B59E6B]/10">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Nivel de Ocupación</p>
            <span className="text-2xl font-serif" style={{ color: color }}>
              {temporadaAlta.porcentaje_ocupacion.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#B59E6B]/5 rounded-full overflow-hidden">
            <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${temporadaAlta.porcentaje_ocupacion}%`, backgroundColor: color }} />
          </div>
        </div>
      </div>

      <div className="absolute -right-10 -bottom-10 opacity-[0.01] dark:opacity-[0.02] pointer-events-none transition-transform duration-700 group-hover:scale-110">
        <AiOutlinePercentage size={200} />
      </div>
    </div>
  );
};
