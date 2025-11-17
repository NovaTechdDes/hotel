
import { BsPerson } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import { useUsuarioStore } from '../../store/usuario.store';
import { ModalUsuario } from '../../components/dashboard/ModalUsuario';
import { useRolAuth } from '../../hooks/auth/useRolAuth';

export const Usuario = () => {

    const { isModalOpen, openModal } = useUsuarioStore();
    const { data: user } = useRolAuth();

    if (user && user?.rol !== 'admin') return;


    const handleModal = () => {
        openModal();
    };

    return (
        <div className='px-5 text-black my-5'>

            <div className='mt-5 mb-10'>
                <h2 className='text-2xl font-semibold  flex items-center gap-2'>
                    <BsPerson color='blue' />
                    Gestion de Usuarios
                </h2>
                <p className='text-gray-500'>Administra los usuarios que tienen acceso al sistema</p>
            </div>

            <div className=''>

                <div className='flex flex-col gap-5'>
                    <div className='flex gap-5'>
                        <h2 className='font-semibold'>Crear Nuevo Usuario</h2>
                        <button onClick={handleModal} className='flex items-center gap-2 p-2 rounded-lg bg-blue-600 text-white cursor-pointer hover:opacity-80'>
                            <IoAdd />
                            Nuevo Usuario
                        </button>
                    </div>

                    <span className='text-gray-500'>Haz clic en el boton para agregar un nuevo usuario</span>
                </div>


            </div>

            {isModalOpen && <ModalUsuario />}

        </div>
    )
}
