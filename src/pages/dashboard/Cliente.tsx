import { useState } from 'react';

import ListaClientes from '../../components/dashboard/cliente/ListaClientes';
import { ModalCliente } from '../../components/dashboard/cliente/ModalCliente';

import { useClienteStore } from '../../store/cliente.store';
import { HeaderMain } from '../../components';

export const Cliente = () => {
    const { isModalOpen, openModal } = useClienteStore()

    return (
        <main>
            <HeaderMain openModal={openModal} botonText='Agregar Cliente' />
            <ListaClientes />
            {isModalOpen && <ModalCliente />}
        </main>
    )
}
