import { BiCalendar, BiPencil } from 'react-icons/bi';
import type { Egreso } from '../../../interface/Egreso';
import { MdDeleteOutline } from 'react-icons/md';
import { useEgresoStore } from '../../../store';
import Swal from 'sweetalert2';
import { useMutateEgreso } from '../../../hooks/egreso/useMutateEgreso';
import { useRolAuth } from '../../../hooks/auth/useRolAuth';

interface Props {
  egreso: Egreso;
}

export const EgresoCard = ({ egreso }: Props) => {
  const { openModal } = useEgresoStore();
  const { removeEgreso } = useMutateEgreso();
  const { data: user } = useRolAuth();

  const { id, descripcion, creado_en, importe, tipoEgreso } = egreso;
  const { isPending, mutateAsync } = removeEgreso;

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Confirmar Eliminación?',
      text: `Se retirará el registro "${descripcion}" de forma permanente.`,
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
    openModal(egreso);
  };

  return (
    <div
      className={`group bg-white dark:bg-[#2D2926] p-6 rounded-sm border border-[#B59E6B]/10 shadow-[var(--shadow-boutique)] hover:border-[#B59E6B]/30 transition-all duration-500 relative ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59E6B] bg-[#B59E6B]/5 px-2 py-0.5 rounded-sm">{tipoEgreso?.descripcion}</span>
            <span className="text-[10px] text-[#2D2926]/40 dark:text-[#FDFCFB]/30 flex items-center gap-1.5 uppercase tracking-widest">
              <BiCalendar className="text-sm" />
              {creado_en?.slice(0, 10).split('-').reverse().join('/')}
            </span>
          </div>
          <h3 className="text-lg font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide capitalize">{descripcion}</h3>
        </div>

        <div className="flex flex-col items-end gap-1">
          <p className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-tighter">
            <span className="text-sm mr-1 opacity-40">$</span>
            {importe.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handlePut}
              className="text-[10px] uppercase tracking-widest font-bold text-[#B59E6B] hover:text-[#2D2926] dark:hover:text-[#FDFCFB] flex items-center gap-1 transition-colors"
              disabled={isPending}
            >
              <BiPencil className="text-sm" />
              Editar
            </button>
            {user && user.rol === 'admin' && (
              <button
                onClick={handleDelete}
                className="text-[10px] uppercase tracking-widest font-bold text-red-400/60 hover:text-red-500 flex items-center gap-1 transition-colors"
                disabled={isPending}
              >
                <MdDeleteOutline className="text-sm" />
                Retirar
              </button>
            )}
          </div>
        </div>
      </div>

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FDFCFB]/80 dark:bg-[#2D2926]/80 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#B59E6B] border-t-transparent animate-spin rounded-full" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#B59E6B]">Procesando...</span>
          </div>
        </div>
      )}
    </div>
  );
};
