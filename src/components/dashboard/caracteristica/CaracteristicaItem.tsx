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
      title: '¿Estas seguro?',
      text: 'No podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    });

    if (isConfirmed && caracteristica.id) {
      eliminar(caracteristica?.id);
    }
  };

  return (
    <div className="flex flex-col gap-5  py-5 px-2 border border-gray-300 mx-5 bg-gray-50 rounded-lg h-32 dark:bg-slate-800 dark:border-gray-600">
      <p className="text-lg font-semibold dark:text-white">{caracteristica.nombre}</p>

      <button
        onClick={handleDelete}
        className="text-red-500 justify-center w-full text-center flex items-center gap-2 cursor-pointer mt-auto border border-gray-300 bg-white p-2 rounded-lg dark:hover:bg-slate-600 dark:bg-slate-700 dark:border-gray-600"
      >
        {isPendingEliminar ? (
          'Eliminando...'
        ) : (
          <>
            <MdDeleteOutline />
            Eliminar
          </>
        )}
      </button>
    </div>
  );
};

export default CaracteristicaItem;
