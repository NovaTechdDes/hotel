import { BiCalendar, BiPencil } from 'react-icons/bi';
import type { Egreso } from '../../../interface/Egreso';
import { MdDeleteOutline } from 'react-icons/md';
import { GoTag } from 'react-icons/go';
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
      title: `Quiere eliminar el egreso ${descripcion}`,
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
    });

    if (isConfirmed && id) {
      mutateAsync(id);
    }
  };

  const handlePut = () => {
    openModal(egreso);
  };

  return (
    <div className={`bg-white text-black p-5 my-5 rounded-lg shadow-xl ${isPending ? 'opacity-70 pointer-events-none relative' : ''}`}>
      <div>
        <div className="flex justify-between">
          <h3 className="font-semibold text-2xl">{descripcion}</h3>
          <p className="flex text-xs gap-5 items-center bg-gray-100 px-2 py-1 rounded-lg">
            <GoTag />
            {tipoEgreso?.descripcion}
          </p>
        </div>

        <div className="flex gap-5">
          <span className="flex items-center gap-2 text-gray-500">
            <BiCalendar />
            {creado_en?.slice(0, 10)}
          </span>
          <span className="font-semibold text-lg">${importe.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-center items-center border-t border-gray-300 mt-5 pt-5 gap-5">
        <button disabled={isPending} className="flex gap-2 border border-gray-300 rounded-lg items-center px-8 py-1 hover:bg-blue-700 bg-blue-600 text-white cursor-pointer" onClick={handlePut}>
          <BiPencil />
          Editar
        </button>

        {user && user.rol === 'admin' && (
          <button disabled={isPending} onClick={handleDelete} className="flex  gap-2 border border-gray-300 rounded-lg items-center px-8 py-1 cursor-pointer text-white bg-red-500 hover:bg-red-600">
            <MdDeleteOutline />
            Eliminar
          </button>
        )}
      </div>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
          <span className="text-tred-600 font-semibold text-base">Eliminando...</span>
        </div>
      )}
    </div>
  );
};
