import { BsCurrencyDollar } from "react-icons/bs";

import { useEgresoStore } from "../../store/egreso.store"
import { IoDocumentTextOutline } from "react-icons/io5";

import { EgresoMain, HeaderMain } from "../../components";
import { useEgresoImporteTotal } from "../../hooks/egreso/useEgresoImporteTotal";
import { useEgresos } from "../../hooks/egreso/useEgresos";
import { ModalEgreso } from "../../components/dashboard/egreso/ModalEgreso";


const Egreso = () => {

    const { openModal, isModalOpen } = useEgresoStore();
    const { data: totalEgresos, isLoading } = useEgresoImporteTotal()
    const { data: egresos } = useEgresos();

    return (
        <main className="text-black">
            <HeaderMain botonText="Agregar Egreso" openModal={openModal} />

            <div className="grid mx-5 grid-cols-4 gap-5">
                <div className="border border-gray-300 col-span-3 bg-white rounded-lg flex justify-between p-5 shadow-xl cursor-pointer"  >
                    <div>
                        <p className="text-gray-600">Total de Egresos</p>

                        <h3 className="text-2xl font-bold text-gray-800">{isLoading ? 'Cargando Total Egresos...' : `${totalEgresos?.toFixed(2)}`}</h3>
                    </div>
                    <BsCurrencyDollar size={30} className="my-auto" />
                </div>

                <div className="border border-gray-300  bg-white rounded-lg flex justify-between p-5 shadow-xl cursor-pointer">
                    <div>
                        <p className="text-gray-600">Cantidad</p>
                        <h3 className="text-2xl font-bold text-gray-800">{egresos?.length ?? '0'}</h3>
                    </div>

                    <IoDocumentTextOutline size={30} className="my-auto" />
                </div>

            </div>

            <EgresoMain />

            {isModalOpen && <ModalEgreso />}

        </main>
    )
}

export default Egreso