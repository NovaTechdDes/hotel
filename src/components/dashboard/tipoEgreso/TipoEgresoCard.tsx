import { GoTag } from 'react-icons/go';

import { BiPencil } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useMutateTipoEgreso } from '../../../hooks/tipoEgreso/useMutateTipoEgreso';
import { useTipoEgresoStore } from '../../../store';
import type { TipoEgreso } from '../../../interface/TipoEgreso';

interface Props {
  tipoEgreso: TipoEgreso;
}

const TipoEgresoCard = ({ tipoEgreso }: Props) => {
  const { id, descripcion } = tipoEgreso;
  const { openModal } = useTipoEgresoStore();

  const { removeTipoEgreso } = useMutateTipoEgreso();
  const { isPending, mutateAsync } = removeTipoEgreso;

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Confirmar Eliminación?',
      text: `Se retirará "${descripcion}" de los tipos de egreso.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Volver',
      background: '#FDFCFB',
      color: '#2D2926',
      confirmButtonColor: '#B59E6B',
    });

    if (isConfirmed && id) {
      mutateAsync(id);
    }
  };

  const handlePut = () => {
    openModal(tipoEgreso);
  };

  return (
    <div
      className={`group flex flex-col justify-between p-6 bg-[#FDFCFB] dark:bg-white/5 border border-[#F5F0E1] dark:border-white/10 rounded-sm hover:border-[#B59E6B]/40 transition-all duration-500 relative ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 bg-[#B59E6B]/10 rounded-sm">
          <GoTag className="text-xl text-[#B59E6B]" />
        </div>
        <div>
          <h3 className="text-sm font-medium tracking-wide text-[#2D2926] dark:text-[#FDFCFB] leading-tight capitalize">{descripcion}</h3>
          <p className="text-[9px] uppercase tracking-widest text-[#2D2926]/30 dark:text-[#FDFCFB]/20 mt-1">Categoría de Egreso</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#B59E6B]/10">
        <button
          onClick={handlePut}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/60 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-all duration-300"
          disabled={isPending}
        >
          <BiPencil className="text-sm" />
          <span>Editar</span>
        </button>

        <div className="w-[1px] h-3 bg-[#B59E6B]/20" />

        <button
          onClick={handleDelete}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/30 dark:text-[#FDFCFB]/20 hover:text-red-400 transition-all duration-300"
          disabled={isPending}
        >
          <MdDeleteOutline className="text-sm" />
          <span>Retirar</span>
        </button>
      </div>

      {isPending && (
        <div className="absolute inset-x-0 bottom-4 flex justify-center">
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#B59E6B] animate-pulse">Procesando...</span>
        </div>
      )}
    </div>
  );
};

export default TipoEgresoCard;
