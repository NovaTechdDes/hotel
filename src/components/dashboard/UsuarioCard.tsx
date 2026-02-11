import { BiEdit } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import type { Usuario } from '../../interface';

interface Props {
  usuario: Usuario;
}

export const UsuarioCard = ({ usuario }: Props) => {
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
      <td className="text-white py-4 px-6 text-sm ">{usuario.last_sign_in_at ? new Date(usuario.last_sign_in_at).toLocaleDateString() : <span className="italic text-[#2D2926]/40">Nunca</span>}</td>
      <td className="text-white py-4 px-6 text-right">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F0E1] text-[#7A6B45]">Activo</span>
      </td>
      <td className="text-white py-4 px-6 text-sm ">
        <div className="flex gap-2 justify-center">
          <BiEdit className="cursor-pointer dark:text-[#FDFCFB]/40 hover:text-[#B59E6B]" size={25} />
          <MdDeleteOutline className="cursor-pointer  dark:text-[#FDFCFB]/20 hover:text-red-400" size={25} />
        </div>
      </td>
    </tr>
  );
};
