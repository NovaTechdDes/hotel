import { BsCurrencyDollar } from 'react-icons/bs';

import { useEgresoStore } from '../../store/egreso.store';
import { IoDocumentTextOutline } from 'react-icons/io5';

import { EgresoMain, HeaderMain } from '../../components';
import { useEgresoImporteTotal } from '../../hooks/egreso/useEgresoImporteTotal';
import { useEgresos } from '../../hooks/egreso/useEgresos';
import { ModalEgreso } from '../../components/dashboard/egreso/ModalEgreso';

const Egreso = () => {
  const { openModal, isModalOpen } = useEgresoStore();
  const { data: totalEgresos, isLoading } = useEgresoImporteTotal();
  const { data: egresos } = useEgresos();

  return (
    <main className="text-black">
      <HeaderMain botonText="Agregar Egreso" openModal={openModal} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="border border-gray-300 col-span-2 mx-2 bg-white rounded-lg flex justify-between p-5 shadow-xl cursor-pointer dark:bg-gray-600">
          <div>
            <p className="text-gray-600 dark:text-gray-200">Total de Egresos</p>

            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{isLoading ? 'Cargando Total Egresos...' : `${totalEgresos?.toFixed(2)}`}</h3>
          </div>
          <BsCurrencyDollar size={30} className="my-auto dark:text-gray-300" />
        </div>

        <div className="border border-gray-300 col-span-2 mx-2 bg-white rounded-lg flex justify-between p-5 shadow-xl cursor-pointer dark:bg-gray-600">
          <div>
            <p className="text-gray-600 dark:text-gray-200">Cantidad</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{egresos?.length ?? '0'}</h3>
          </div>

          <IoDocumentTextOutline size={30} className="my-auto dark:text-gray-300" />
        </div>
      </div>

      <EgresoMain />

      {isModalOpen && <ModalEgreso />}
    </main>
  );
};

export default Egreso;
