import { useState } from 'react';
import { BiPencil } from 'react-icons/bi';
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
    setLoading(true);
    const { isConfirmed } = await Swal.fire({
      text: `Quiere eliminar la habitacion ${nombre}`,
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
    });

    if (isConfirmed && id) {
      const result = await mutateAsync(id);
      console.log(result);
    }
    setLoading(false);
  };

  const handleUpdate = () => {
    openModal(habitacion);
  };

  return (
    <div className={`text-center border p-5 rounded-lg bg-white dark:bg-slate-800 border-gray-300 text-lg transition-all duration-200 ${loading ? 'bg-gray-300/70 opacity-70' : ''}`}>
      <div className="flex justify-between px-2">
        <div>
          <h2 className="font-bold dark:text-white">{nombre}</h2>
          <p className="text-gray-500 dark:text-slate-200 capitalize text-start text-sm">{tipo}</p>
        </div>
        <div>
          <p className="text-green-700 bg-green-200 p-2 text-xs rounded-lg dark:text-white dark:bg-green-700">{disponible ?? 'Disponible'}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-gray-700 dark:text-slate-200">
        <IoPeopleOutline size={20} />
        <p>Capacidad:</p>
        <p>{capacidad} personas</p>
      </div>

      {observaciones && (
        <div className="mt-2 flex items-center gap-2 text-md text-gray-700">
          <IoPeopleOutline size={25} />
          <p>Observaciones:</p>
          <p>{observaciones}</p>
        </div>
      )}

      <div className="grid grid-cols-2 items-center gap-5 mt-10 justify-center border-t border-gray-300 pt-5">
        {loading ? (
          <span className="flex items-center gap-1 text-gray-500">
            <span className="w-4 h-4 border-2 border-gray-400 border-t-black rounded-full animate-spin"></span>
            <span className="text-xs">Cargando...</span>
          </span>
        ) : (
          <>
            <button
              className="flex  justify-center items-center gap-2 border border-gray-300 text-black bg-white rounded-lg py-1 px-1 hover:bg-gray-200 cursor-pointer dark:bg-slate-800 dark:text-white dark:border-gray-300 dark:hover:bg-gray-700"
              onClick={handleUpdate}
            >
              <BiPencil size={20} className="cursor-pointe rounded-lg" />
              <p>Editar</p>
            </button>
            {user && user?.rol === 'admin' && (
              <button
                className="flex  justify-center items-center gap-2 text-white bg-red-600 rounded-lg py-1 px-1 hover:bg-red-700 cursor-pointer dark:bg-slate-800 dark:text-red-500 dark:border-red-500 dark:border dark:hover:bg-slate-700"
                onClick={handleDeleteHabitacion}
              >
                <MdDeleteOutline className=" cursor-pointer  rounded-lg" size={20} />
                <p>Eliminar</p>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HabitacionCard;
