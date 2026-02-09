import { IoDocumentTextOutline } from 'react-icons/io5';
import { useEgresos } from '../../../hooks/egreso/useEgresos';
import { Loading } from '../../ui/Loading';
import { EgresoCard } from './EgresoCard';

export const ListaEgresos = () => {
  const { data: egresos, isLoading } = useEgresos();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Compilando Registros..." />
      </div>
    );

  return (
    <div className="h-[calc(100vh-450px)] overflow-y-auto pr-4 custom-scrollbar space-y-6">
      {egresos?.map((elem) => (
        <EgresoCard egreso={elem} key={elem.id} />
      ))}

      {egresos?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[#2D2926]/30 dark:text-[#FDFCFB]/20 border-2 border-dashed border-[#B59E6B]/10 rounded-sm">
          <IoDocumentTextOutline className="text-4xl mb-4 opacity-10" />
          <p className="text-xs uppercase tracking-[0.2em] font-bold">No se registran egresos</p>
        </div>
      )}
    </div>
  );
};
