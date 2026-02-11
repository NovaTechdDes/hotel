import { BsPerson } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import { useUsuarioStore } from '../../store/usuario.store';
import { ModalUsuario } from '../../components/dashboard/ModalUsuario';
import { useRolAuth } from '../../hooks/auth/useRolAuth';
import { useUser } from '../../hooks/user/useUser';
import { UsuarioCard } from '../../components/dashboard/UsuarioCard';

export const Usuario = () => {
  const { isModalOpen, openModal } = useUsuarioStore();
  const { data: user } = useRolAuth();

  const { data: usuarios, isLoading } = useUser();

  if (user && user?.rol !== 'admin') return;

  const handleModal = () => {
    openModal();
  };

  return (
    <div className="px-6 py-8 text-[#2D2926] font-sans">
      <div className="flex justify-between items-end mb-10 border-b border-[#F5F0E1] pb-6">
        <div>
          <h2 className="text-xl font-serif font-medium text-[#2D2926] flex items-center gap-3 mb-2 dark:text-white">
            <span className="p-2 bg-[#B59E6B]/10 rounded-full text-[#B59E6B]">
              <BsPerson size={24} />
            </span>
            Gestión de Usuarios
          </h2>
          <p className="text-[#2D2926]/70 ml-1">Administra el acceso y roles del personal del hotel</p>
        </div>

        <button
          onClick={handleModal}
          className="flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded shadow-sm bg-[#B59E6B] text-black hover:bg-[#a38d5d] transition-colors duration-200 font-medium tracking-wide"
        >
          <IoAdd size={20} />
          Nuevo Usuario
        </button>
      </div>

      <div className="rounded-lg shadow-[0_4px_6px_-1px_rgba(45,41,38,0.05)] border bg-[#B59E6B]/10 border-[#F5F0E1] overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-12 text-[#B59E6B]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
              <span className="ml-3 text-[#2D2926]/70">Cargando usuarios...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className=" border-b border-[#F5F0E1]">
                  <th className="py-4 px-6 text-xs font-semibold text-white uppercase tracking-wider">Usuario</th>
                  <th className="py-4 px-6 text-xs font-semibold text-white uppercase tracking-wider">Rol</th>
                  {/* <th className="py-4 px-6 text-xs font-semibold text-white uppercase tracking-wider">ID de Sistema</th> */}
                  <th className="py-4 px-6 text-xs font-semibold text-white uppercase tracking-wider">Fecha de Registro</th>
                  <th className="py-4 px-6 text-xs font-semibold text-white uppercase tracking-wider">Último Acceso</th>
                  <th className="py-4 px-6 text-xs font-semibold text-white uppercase tracking-wider text-right">Estado</th>
                  <th className="py-4 px-6 text-xs font-semibold text-white uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F0E1]">
                {usuarios?.map((u: any) => (
                  <UsuarioCard key={u.id} usuario={u} />
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && usuarios && usuarios.length === 0 && (
            <div className="text-center py-12">
              <BsPerson className="mx-auto h-12 w-12 text-[#F5F0E1]" />
              <h3 className="mt-2 text-sm font-medium text-[#2D2926]">No hay usuarios</h3>
              <p className="mt-1 text-sm text-[#2D2926]/60">Comienza creando un nuevo usuario para gestionar el sistema.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && <ModalUsuario />}
    </div>
  );
};
