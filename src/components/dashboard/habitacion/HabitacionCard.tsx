import { useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { RiPushpinLine } from 'react-icons/ri';
import type { Habitacion } from '../../../interface/Habitacion';
import { MdDeleteOutline } from 'react-icons/md';
import { useMutateHabitacion } from '../../../hooks/habitacion/useMutateHabitacion';
import Swal from 'sweetalert2';
import { useHabitacionStore } from '../../../store';
import { useRolAuth } from '../../../hooks/auth/useRolAuth';
import { IoPeopleOutline } from 'react-icons/io5';

interface Props {
  habitacion: Habitacion;
}

const HabitacionCard = ({ habitacion }: Props) => {
  const { id, capacidad, nombre, tipo, disponible, observaciones } = habitacion;
  const { openModal } = useHabitacionStore();
  const { data: user } = useRolAuth();

  const { removeHabitacion } = useMutateHabitacion();
  const { mutateAsync } = removeHabitacion;

  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteHabitacion = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Retirar Suite?',
      text: `Se eliminará la habitación "${nombre.toUpperCase()}" del catálogo.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Retirar',
      cancelButtonText: 'Mantener',
      background: '#FDFCFB',
      color: '#2D2926',
      confirmButtonColor: '#B59E6B',
    });

    if (isConfirmed && id) {
      setLoading(true);
      await mutateAsync(id);
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    openModal(habitacion);
  };

  return (
    <div
      className={`group bg-white dark:bg-[#2D2926] p-8 rounded-sm border border-[#B59E6B]/10 shadow-[var(--shadow-boutique)] hover:border-[#B59E6B]/30 transition-all duration-500 relative flex flex-col h-full ${loading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex justify-between items-start mb-6 border-b border-[#B59E6B]/10 pb-4">
        <div className="space-y-1">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Suite Residencial</p>
          <h2 className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide group-hover:text-[#B59E6B] transition-colors duration-300">{nombre}</h2>
          <p className="text-[10px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold capitalize">{tipo}</p>
        </div>
        <div className="pt-2">
          <span
            className={`text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-sm border font-bold transition-colors ${
              disponible !== 'ocupado' ? 'text-[#B59E6B] border-[#B59E6B]/20 bg-[#B59E6B]/5' : 'text-red-400 border-red-400/20 bg-red-400/5'
            }`}
          >
            {disponible ?? 'Disponible'}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4 group/item">
          <div className="w-8 h-8 rounded-full bg-[#B59E6B]/5 flex items-center justify-center border border-[#B59E6B]/10 group-hover/item:bg-[#B59E6B]/10 transition-colors">
            <IoPeopleOutline className="text-[#B59E6B]" size={14} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[8px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold">Capacidad Máxima</p>
            <p className="text-xs text-[#2D2926] dark:text-[#FDFCFB] font-medium tracking-wider">{capacidad} Huéspedes</p>
          </div>
        </div>

        {Boolean(observaciones) && (
          <div className="flex items-start gap-4 group/item">
            <div className="w-8 h-8 rounded-full bg-[#B59E6B]/5 flex items-center justify-center border border-[#B59E6B]/10 group-hover/item:bg-[#B59E6B]/10 transition-colors shrink-0 mt-0.5">
              <RiPushpinLine className="text-[#B59E6B]" size={14} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[8px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold">Observaciones del Servicio</p>
              <p className="text-xs text-[#2D2926]/60 dark:text-[#FDFCFB]/50 leading-relaxed italic line-clamp-2">{observaciones}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center gap-4 pt-6 border-t border-[#B59E6B]/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button
          onClick={handleUpdate}
          className="flex-1 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#B59E6B] hover:text-[#2D2926] dark:hover:text-[#FDFCFB] border border-[#B59E6B]/20 py-2.5 rounded-sm hover:bg-[#B59E6B]/5 transition-all"
        >
          <BiPencil size={14} />
          Ajustar Suite
        </button>
        {user && user?.rol === 'admin' && (
          <button
            onClick={handleDeleteHabitacion}
            className="flex items-center justify-center p-2.5 text-red-400/60 hover:text-red-500 border border-red-500/10 hover:bg-red-500/5 rounded-sm transition-all"
            title="Retirar Suite"
          >
            <MdDeleteOutline size={18} />
          </button>
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FDFCFB]/80 dark:bg-[#2D2926]/80 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-3 animate-in zoom-in-95 duration-300">
            <div className="w-8 h-8 border-2 border-[#B59E6B] border-t-transparent animate-spin rounded-full" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#B59E6B]">Sincronizando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitacionCard;
