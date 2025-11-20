
import ListaClientes from '../../components/dashboard/cliente/ListaClientes';
import { ModalCliente } from '../../components/dashboard/cliente/ModalCliente';

import { useClienteStore } from '../../store/cliente.store';
import { HeaderMain } from '../../components';

export const Cliente = () => {
    const { isModalOpen, openModal, setFiltro } = useClienteStore();

    return (
        <main>
            <HeaderMain openModal={openModal} botonText='Agregar Cliente' />

            <div className='text-black mx-5 my-2'>
                <input 
                 type="text"
                 onChange={(e) => setFiltro(e.target.value)}
                 name="buscador" id="buscador"
                 placeholder='Buscar cliente por nombre o DNI'
                 className='placeholder:text-slate-500 w-full p-2 border border-slate-300 bg-white rounded-md focus:outline-none focus:border-sky-500'
                 />
            </div>

            <ListaClientes />
            {isModalOpen && <ModalCliente />}
        </main>
    )
}
