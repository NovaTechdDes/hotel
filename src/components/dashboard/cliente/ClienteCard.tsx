import type { Cliente } from '../../../interface/Cliente';
import { MdDeleteOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useMutateCliente } from '../../../hooks/clientes/useMutateCliente';
import { useClienteStore } from '../../../store/cliente.store';
import { useRolAuth } from '../../../hooks/auth/useRolAuth';
import { CiLocationOn } from 'react-icons/ci';
import { LuIdCard, LuPhone } from 'react-icons/lu';
import { BiPencil } from 'react-icons/bi';

interface Props {
  cliente: Cliente;
}

const ClienteCard = ({ cliente }: Props) => {
  const { openModal } = useClienteStore();
  const { removeCliente } = useMutateCliente();
  const { data: user } = useRolAuth();
  const { filtro } = useClienteStore();

  const { mutateAsync, isPending } = removeCliente;
  const { nombre, dni, id, localidad, telefono } = cliente;

  const handleDeleteCliente = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Confirmar Retiro?',
      text: `Se eliminará el perfil de "${nombre.toUpperCase()}" de la base de huéspedes.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Retirar',
      cancelButtonText: 'Mantener',
      background: '#FDFCFB',
      color: '#2D2926',
      confirmButtonColor: '#B59E6B',
    });

    if (isConfirmed && id) {
      mutateAsync(id);
    }
  };

  const handleUpdateCliente = () => {
    openModal(cliente);
  };

  if (!nombre.toUpperCase().startsWith(filtro?.toUpperCase() || '') && !dni.toUpperCase().startsWith(filtro?.toUpperCase() || '') && !telefono.toUpperCase().includes(filtro?.toUpperCase() || ''))
    return null;

  return (
    <div
      className={`group bg-white dark:bg-[#2D2926] p-8 rounded-sm border border-[#B59E6B]/10 shadow-[var(--shadow-boutique)] hover:border-[#B59E6B]/30 transition-all duration-500 relative flex flex-col h-full ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="mb-6 border-b border-[#B59E6B]/10 pb-4">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold mb-1">Perfil de Huésped</p>
        <h2 className="text-xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide capitalize group-hover:text-[#B59E6B] transition-colors duration-300 line-clamp-1">{nombre}</h2>
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4 group/item">
          <div className="w-8 h-8 rounded-full bg-[#B59E6B]/5 flex items-center justify-center border border-[#B59E6B]/10 group-hover/item:bg-[#B59E6B]/10 transition-colors">
            <LuIdCard className="text-[#B59E6B]" size={14} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[8px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold">Documento</p>
            <p className="text-xs text-[#2D2926] dark:text-[#FDFCFB] font-medium tracking-wider">{dni}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 group/item">
          <div className="w-8 h-8 rounded-full bg-[#B59E6B]/5 flex items-center justify-center border border-[#B59E6B]/10 group-hover/item:bg-[#B59E6B]/10 transition-colors">
            <LuPhone className="text-[#B59E6B]" size={14} />
          </div>
          <div className="space-y-0.5">
            <p className="text-[8px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold">Teléfono de Contacto</p>
            <p className="text-xs text-[#2D2926] dark:text-[#FDFCFB] font-medium tracking-wider">{telefono}</p>
          </div>
        </div>

        {localidad && (
          <div className="flex items-center gap-4 group/item">
            <div className="w-8 h-8 rounded-full bg-[#B59E6B]/5 flex items-center justify-center border border-[#B59E6B]/10 group-hover/item:bg-[#B59E6B]/10 transition-colors">
              <CiLocationOn className="text-[#B59E6B]" size={14} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[8px] uppercase tracking-widest text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold">Ubicación</p>
              <p className="text-xs text-[#2D2926] dark:text-[#FDFCFB] font-medium tracking-wider capitalize">{localidad}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center gap-4 pt-6 border-t border-[#B59E6B]/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button
          onClick={handleUpdateCliente}
          className="flex-1 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#B59E6B] hover:text-[#2D2926] dark:hover:text-[#FDFCFB] border border-[#B59E6B]/20 py-2.5 rounded-sm hover:bg-[#B59E6B]/5 transition-all"
        >
          <BiPencil size={14} />
          Ajustar Perfil
        </button>
        {user && user.rol === 'admin' && (
          <button
            onClick={handleDeleteCliente}
            className="flex items-center justify-center p-2.5 text-red-400/60 hover:text-red-500 border border-red-500/10 hover:bg-red-500/5 rounded-sm transition-all"
            title="Eliminar Huésped"
          >
            <MdDeleteOutline size={18} />
          </button>
        )}
      </div>

      {isPending && (
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

export default ClienteCard;
