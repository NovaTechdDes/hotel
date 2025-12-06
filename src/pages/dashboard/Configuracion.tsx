import TipoEgreso from './TipoEgreso';
import { Precios } from './Precios';
import { useRolAuth } from '../../hooks/auth/useRolAuth';
import { CaracteristicaLista } from '../../components/dashboard/caracteristica/CaracteristicaLista';

export const Configuracion = () => {
  const { data: user } = useRolAuth();

  if (!user) {
    return;
  }

  return (
    <div className="text-black">
      <div className="container m-7">
        <h2 className="text-2xl font-bold dark:text-white">Configuracion</h2>
        <p className="dark:text-white">Administra los precios y tipos de egresos del sistema</p>
      </div>

      <div className="flex flex-col gap-5 overflow-y-auto h-[calc(100vh-180px)]">
        {user?.rol === 'admin' && (
          <div className="border border-gray-300 bg-white mx-5 rounded-lg dark:bg-slate-800 dark:border-gray-600">
            <Precios />
          </div>
        )}

        <div className="border border-gray-300 mx-5 bg-white rounded-lg dark:bg-slate-800 dark:border-gray-600">
          <CaracteristicaLista />
        </div>

        <div className="border border-gray-300 mx-5 bg-white rounded-lg dark:bg-slate-800 dark:border-gray-600">
          <TipoEgreso />
        </div>

        {/* <div className="border border-gray-300 mx-5 bg-white rounded-lg dark:bg-slate-800 dark:border-gray-600">
          <Usuario />
        </div> */}
      </div>
    </div>
  );
};
