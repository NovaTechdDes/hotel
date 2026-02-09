import Swal from 'sweetalert2';
import { useMutateCaracteristicas } from '../../../hooks';
import type { Caracteristica } from '../../../interface';
import { MdDeleteOutline } from 'react-icons/md';

interface Props {
  caracteristica: Caracteristica;
}

const CaracteristicaItem = ({ caracteristica }: Props) => {
  const { eliminarCaracteristica } = useMutateCaracteristicas();
  const { mutateAsync: eliminar, isPending: isPendingEliminar } = eliminarCaracteristica;

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar Característica?',
      text: `Se retirará "${caracteristica.nombre}" de las opciones disponibles.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, retirar',
      cancelButtonText: 'Cancelar',
      background: '#FDFCFB',
      color: '#2D2926',
      confirmButtonColor: '#B59E6B',
    });

    if (isConfirmed && caracteristica.id) {
      eliminar(caracteristica?.id);
    }
  };

  return (
    <div className="group flex flex-col justify-between h-fit p-6 bg-[#FDFCFB] dark:bg-white/5 border border-[#F5F0E1] dark:border-white/10 rounded-sm hover:border-[#B59E6B]/40 transition-all duration-500">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium tracking-wide text-[#2D2926] dark:text-[#FDFCFB]">{caracteristica.nombre?.toUpperCase()}</p>
        <div className="w-1.5 h-1.5 rounded-full bg-[#B59E6B] opacity-40" />
      </div>

      <button
        onClick={handleDelete}
        className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 hover:text-red-400 transition-colors duration-300 outline-none"
      >
        {isPendingEliminar ? (
          <span className="animate-pulse">Retirando...</span>
        ) : (
          <>
            <MdDeleteOutline className="text-sm" />
            <span>Retirar</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CaracteristicaItem;
