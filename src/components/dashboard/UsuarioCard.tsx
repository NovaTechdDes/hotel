import { MdDeleteOutline } from 'react-icons/md';
import type { Usuario } from '../../interface';

import Swal from 'sweetalert2';
import { useMutateUser } from '../../hooks/user/useMutateUser';
import { BiEdit } from 'react-icons/bi';

interface Props {
  usuario: Usuario;
}

export const UsuarioCard = ({ usuario }: Props) => {
  const { updateUserStatusMutation } = useMutateUser();

  const handleDeleteUser = (usuario: Usuario) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a cambiar el estado de ${usuario.email} a ${usuario.estado !== false ? 'Inactivo' : 'Activo'}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B59E6B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
      background: '#fff',
      color: '#2D2926',
    }).then((result) => {
      if (result.isConfirmed) {
        // Invertimos el estado actual (si es undefined/true -> false, si es false -> true)
        const nuevoEstado = usuario.estado === false ? true : false;
        updateUserStatusMutation.mutate({ id: usuario.id!, estado: nuevoEstado });
      }
    });
  };

  return (
    <tr key={usuario.id} className="hover:bg-[#B59E6B]/10 transition-colors duration-150">
      <td className="text-white py-4 px-6">
        <div className="font-medium text-white">{usuario.email}</div>
      </td>
      <td className="text-white py-4 px-6">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${usuario.rol === 'admin' ? 'bg-[#B59E6B] text-white' : 'bg-[#2D2926]/10 dark:bg-white/10 text-[#2D2926] dark:text-white'}`}
        >
          {usuario.rol === 'admin' ? 'Administrador' : 'Empleado'}
        </span>
      </td>
      <td className="text-white py-4 px-6 text-sm  font-mono">{usuario?.id?.substring(0, 8)}...</td>
      <td className="text-white py-4 px-6 text-sm ">{new Date(usuario?.created_at).toLocaleDateString()}</td>
      <td className="text-white py-4 px-6 text-sm ">
        {usuario.last_sign_in_at ? new Date(usuario.last_sign_in_at).toLocaleDateString() : <span className="italic dark:text-white text-[#2D2926]/40">Nunca</span>}
      </td>
      <td className="text-white py-4 px-6 text-right">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            usuario.estado !== false ? 'bg-[#F5F0E1] text-[#7A6B45]' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {usuario.estado !== false ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="text-white py-4 px-6 text-sm ">
        <div className="flex gap-2 justify-center">
          {usuario.estado !== false ? (
            <MdDeleteOutline onClick={() => handleDeleteUser(usuario)} className="cursor-pointer dark:text-[#FDFCFB]/20 hover:text-red-400" size={25} />
          ) : (
            <BiEdit onClick={() => handleDeleteUser(usuario)} className="cursor-pointer dark:text-[#FDFCFB]/40 hover:text-[#B59E6B]" size={25} />
          )}
        </div>
      </td>
    </tr>
  );
};
