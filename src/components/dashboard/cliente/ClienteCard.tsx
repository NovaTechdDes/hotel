

import type { Cliente } from '../../../interface/Cliente'
import { MdDeleteOutline } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { useMutateCliente } from '../../../hooks/clientes/useMutateCliente';
import { useClienteStore } from '../../../store/cliente.store';
import { useRolAuth } from '../../../hooks/auth/useRolAuth';

interface Props {
    cliente: Cliente
};

const ClienteCard = ({ cliente }: Props) => {
    const { openModal } = useClienteStore();
    const { removeCliente } = useMutateCliente();
    const { data: user } = useRolAuth();
    const { filtro } = useClienteStore();

    const { mutateAsync, isPending } = removeCliente;
    const { nombre, dni, id, domicilio, localidad, telefono } = cliente;


    const handleDeleteCliente = async () => {
        const { isConfirmed } = await Swal.fire({
            text: `Quiere eliminar el cliente ${nombre}`,
            confirmButtonText: 'Aceptar',
            showCancelButton: true
        });

        if (isConfirmed && id) {
            mutateAsync(id)
        }
    };

    const handleUpdateCliente = async () => {
        openModal(cliente);
    };

    if(!nombre.toUpperCase().startsWith(filtro?.toUpperCase() || '') && !dni.toUpperCase().startsWith(filtro?.toUpperCase() || '')) return null;

    return (
        <tr className='text-center border border-gray-300 text-lg'>
            <td className='py-2'>{nombre}</td>
            <td className='py-2'>{dni}</td>
            <td className='py-2'>{telefono}</td>
            <td className='py-2'>{domicilio}</td>
            <td className='py-2'>{localidad}</td>
            <td className='py-2'>
                <div className='flex items-center gap-2 justify-center'>
                    {isPending ? (
                        (
                            <span className="flex items-center gap-1 text-gray-500">
                                <span className="w-4 h-4 border-2 border-gray-400 border-t-black rounded-full animate-spin"></span>
                                <span className="text-xs">Cargando...</span>
                            </span>
                        )
                    ) : (
                        <>
                            <BiPencil size={20} className='cursor-pointer hover:bg-gray-300 rounded-lg' onClick={handleUpdateCliente} />
                            {user && user.rol === 'admin' && (
                                <MdDeleteOutline
                                    className='text-red-500 cursor-pointer hover:bg-red-300 rounded-lg'
                                    size={20}
                                    onClick={handleDeleteCliente}
                                />
                            )}
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default ClienteCard