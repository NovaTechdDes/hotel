import ListaClientes from '../../components/dashboard/cliente/ListaClientes';
import { ModalCliente } from '../../components/dashboard/cliente/ModalCliente';
import { LuIdCard } from 'react-icons/lu';

import { useClienteStore } from '../../store/cliente.store';
import { HeaderMain } from '../../components';

export const Cliente = () => {
  const { isModalOpen, openModal, setFiltro } = useClienteStore();

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-[#1E1B18] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <HeaderMain openModal={openModal} botonText="Agregar Cliente" title="Gestión de Huéspedes" />

        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative group max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-[#B59E6B] opacity-50 group-focus-within:opacity-100 transition-opacity">
                <LuIdCard size={18} />
              </span>
            </div>
            <input
              type="text"
              onChange={(e) => setFiltro(e.target.value)}
              name="buscador"
              id="buscador"
              placeholder="Buscar por Nombre, DNI o Teléfono..."
              className="w-full bg-white dark:bg-[#2D2926] border border-[#B59E6B]/10 rounded-sm pl-12 pr-4 py-4 text-sm text-[#2D2926] dark:text-[#FDFCFB] placeholder:text-[#2D2926]/30 dark:placeholder:text-[#FDFCFB]/20 focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 shadow-[var(--shadow-boutique)]"
            />
          </div>
        </div>

        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <ListaClientes />
        </section>

        {isModalOpen && <ModalCliente />}
      </div>
    </div>
  );
};
