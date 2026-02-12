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
    <div className="min-h-screen bg-[#adadad] dark:bg-[#1E1B18] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <HeaderMain botonText="Agregar Egreso" openModal={openModal} title="Gestión de Egresos" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* KPI: Total Egresos */}
          <div className="group bg-white dark:bg-[#2D2926] p-8 rounded-sm border border-[#B59E6B]/10 shadow-[var(--shadow-boutique)] hover:shadow-[var(--shadow-boutique-lg)] transition-all duration-500 relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Inversión Operativa Total</p>
                <h3 className="text-4xl font-serif text-[#2D2926] dark:text-[#FDFCFB] leading-none tracking-tight">
                  {isLoading ? (
                    <span className="animate-pulse opacity-40">...</span>
                  ) : (
                    <>
                      <span className="text-xl mr-1 opacity-50">$</span>
                      {totalEgresos?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </>
                  )}
                </h3>
              </div>
              <div className="p-3 bg-[#B59E6B]/5 rounded-sm">
                <BsCurrencyDollar className="text-2xl text-[#B59E6B]" />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-transform duration-700 group-hover:scale-110">
              <BsCurrencyDollar size={120} />
            </div>
          </div>

          {/* KPI: Cantidad */}
          <div className="group bg-white dark:bg-[#2D2926] p-8 rounded-sm border border-[#B59E6B]/10 shadow-[var(--shadow-boutique)] hover:shadow-[var(--shadow-boutique-lg)] transition-all duration-500 relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Registros del Periodo</p>
                <h3 className="text-4xl font-serif text-[#2D2926] dark:text-[#FDFCFB] leading-none tracking-tight">
                  {egresos?.length ?? '0'}
                  <span className="text-sm font-sans ml-2 opacity-40 uppercase tracking-widest">Egresos</span>
                </h3>
              </div>
              <div className="p-3 bg-[#B59E6B]/5 rounded-sm">
                <IoDocumentTextOutline className="text-2xl text-[#B59E6B]" />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transition-transform duration-700 group-hover:scale-110">
              <IoDocumentTextOutline size={120} />
            </div>
          </div>
        </div>

        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <EgresoMain />
        </section>

        {isModalOpen && <ModalEgreso />}
      </div>
    </div>
  );
};

export default Egreso;
