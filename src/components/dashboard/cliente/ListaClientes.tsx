import { useClientes } from '../../../hooks';
import { Loading } from '../../ui/Loading';
import ClienteCard from './ClienteCard';
import { LuIdCard } from 'react-icons/lu';

const ListaClientes = () => {
  const { data: clientes, isLoading } = useClientes();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Sincronizando Huéspedes..." />
      </div>
    );
  }

  return (
    <div className="min-h-[60vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clientes?.map((elem) => (
          <ClienteCard key={elem.id} cliente={elem} />
        ))}

        {clientes?.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-[#B59E6B]/10 rounded-sm text-[#2D2926]/30 dark:text-[#FDFCFB]/20">
            <LuIdCard size={48} className="mb-4 opacity-10" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">No se registran huéspedes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaClientes;
