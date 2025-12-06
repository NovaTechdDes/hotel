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
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      title: `Quiere eliminar el Tipo Egreso ${descripcion}`,
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
      className={`text-black mx-5 bg-gray-100 my-5 rounded-lg shadow-xl border border-gray-300 dark:bg-slate-700 dark:border-gray-600 ${isPending ? 'opacity-70 pointer-events-none relative' : ''}`}
    >
      <div className="flex gap-5 items-center m-5">
        <GoTag size={25} className="text-blue-800 dark:text-gray-400" />
        <h3 className="text-xl font-semibold dark:text-white">{descripcion}</h3>
      </div>

      <div className="flex gap-5 justify-center mb-5">
        <button
          className="border cursor-pointer hover:bg-gray-200 border-gray-300 rounded-lg flex items-center gap-2 px-4 dark:text-white dark:hover:bg-gray-600 dark:bg-gray-700 dark:border-gray-600"
          disabled={isPending}
          onClick={handlePut}
        >
          <BiPencil />
          Editar
        </button>

        <button
          className="border cursor-pointer hover:bg-red-800 text-white bg-red-700 border-red-300 rounded-lg flex items-center gap-2 px-4 dark:bg-slate-800 dark:text-red-500 dark:border-slate-600 dark:hover:bg-gray-600"
          disabled={isPending}
          onClick={handleDelete}
        >
          <MdDeleteOutline />
          Eliminar
        </button>
      </div>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 rounded-lg dark:bg-slate-800">
          <span className="text-red-600 font-semibold text-base dark:text-red-400">Eliminando...</span>
        </div>
      )}
    </div>
  );
};

export default TipoEgresoCard;
