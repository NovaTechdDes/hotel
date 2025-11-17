
import TipoEgreso from './TipoEgreso'
import { Precios } from './Precios'
import { Usuario } from './Usuario'
import { useRolAuth } from '../../hooks/auth/useRolAuth'

export const Configuracion = () => {
    const { data: user } = useRolAuth();

    if (!user) {
        return;
    }


    return (
        <div className='text-black'>

            <div className='container m-7'>
                <h2 className='text-2xl font-bold'>Configuracion</h2>
                <p>Administra los precios y tipos de egresos del sistema</p>
            </div>

            <div className='flex flex-col gap-5 overflow-y-auto h-[calc(100vh-180px)]'>
                {user?.rol === 'admin' && (
                    <div className='border border-gray-300 bg-white mx-5 rounded-lg'>
                        <Precios />
                    </div>
                )}

                <div className='border border-gray-300 mx-5 bg-white rounded-lg'>
                    <TipoEgreso />
                </div>

                <div className='border border-gray-300 mx-5 bg-white rounded-lg'>
                    <Usuario />
                </div>
            </div>

        </div>
    )
}
