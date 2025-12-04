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
      text: `Quiere eliminar el cliente ${nombre}`,
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
    });

    if (isConfirmed && id) {
      mutateAsync(id);
    }
  };

  const handleUpdateCliente = async () => {
    openModal(cliente);
  };

  if (!nombre.toUpperCase().startsWith(filtro?.toUpperCase() || '') && !dni.toUpperCase().startsWith(filtro?.toUpperCase() || '')) return null;

  return (
    <div className="text-center border text-black bg-white rounded-lg border-gray-300 text-lg p-5 dark:bg-slate-800 dark:text-white dark:border-gray-600">
      <div>
        <h2 className="font-bold capitalize dark:text-white">{nombre}</h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <LuIdCard className="text-gray-600 dark:text-gray-400" />
          <p className="capitalize text-gray-800 dark:text-white">{dni}</p>
        </div>
        <div className="flex items-center gap-2">
          <LuPhone className="text-gray-600 dark:text-gray-400" />
          <p className="capitalize text-gray-800 dark:text-white">{telefono}</p>
        </div>
        {localidad && (
          <div className="flex items-center gap-2">
            <CiLocationOn className="text-gray-600 dark:text-gray-400" />
            <p className="capitalize text-gray-800 dark:text-white">{localidad}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 justify-center  my-2">
        {isPending ? (
          <span className="flex items-center gap-1 text-gray-500">
            <span className="w-6 h-6 border-2 border-gray-400 border-t-black dark:border-t-white rounded-full animate-spin"></span>
            <span className="text-sm dark:text-white">Cargando...</span>
          </span>
        ) : (
          <div className="grid grid-cols-2 w-full mt-10  gap-2">
            <button
              className="flex items-center gap-2 text-white-500 justify-center hover:bg-gray-200 bg-white border border-gray-300 text-black cursor-pointer p-2 rounded-lg dark:bg-slate-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              onClick={handleUpdateCliente}
            >
              <BiPencil size={20} className="cursor-pointer rounded-lg" />
              <p>Editar</p>
            </button>
            {user && user.rol === 'admin' && (
              <button
                className="flex items-center justify-center gap-2 text-white-500 hover:bg-red-500 bg-red-600 text-white cursor-pointer p-2 rounded-lg dark:bg-slate-800 dark:text-red-500 dark:border-red-500 dark:border dark:hover:bg-gray-700"
                onClick={handleDeleteCliente}
              >
                <MdDeleteOutline className=" cursor-pointer rounded-lg" size={20} />
                <p>Eliminar</p>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClienteCard;
