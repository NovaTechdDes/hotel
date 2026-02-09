import { useState } from 'react';
import { useCaracteristicas, useMutateCaracteristicas } from '../../../hooks';
import CaracteristicaItem from './CaracteristicaItem';
import { Loading } from '../../ui/Loading';

export const CaracteristicaLista = () => {
  const { data: caracteristicas, isLoading } = useCaracteristicas();
  const { addCaracteristica } = useMutateCaracteristicas();
  const { mutateAsync: agregar, isPending } = addCaracteristica;

  const [nombre, setNombre] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleAdd = async () => {
    if (nombre.trim() === '') {
      setError(true);
      return;
    }

    const ok = await agregar(nombre);

    if (ok) {
      setNombre('');
      setError(false);
    }
  };

  if (isLoading) return <Loading text="Cargando Activos..." />;

  return (
    <div className="p-8">
      <div className="mb-8 overflow-hidden">
        <h2 className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB]">Características de las Habitaciones</h2>
        <p className="text-sm text-[#2D2926]/50 dark:text-[#FDFCFB]/40 mt-1 uppercase tracking-widest text-[9px]">Gestión de equipamiento y servicios de habitaciones</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-10 border-b border-[#B59E6B]/10">
        <div className="flex-1 space-y-2">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 placeholder:text-[#2D2926]/20 dark:placeholder:text-[#FDFCFB]/10 text-sm"
            placeholder="Ej: Aire Acondicionado, Frigobar..."
            type="text"
            name="nombre"
            id="nombre"
          />
          {error && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">El nombre es requerido</p>}
        </div>
        <button
          disabled={isPending}
          onClick={handleAdd}
          className="bg-[#B59E6B] text-[#2D2926] text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 h-fit"
        >
          {isPending ? 'Agregando...' : 'Añadir Activo'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {caracteristicas?.map((caracteristica) => (
          <CaracteristicaItem caracteristica={caracteristica} key={caracteristica.id} />
        ))}
      </div>
    </div>
  );
};
