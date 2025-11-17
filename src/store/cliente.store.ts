import { create } from "zustand";
import type { Cliente } from "../interface/Cliente";

interface ClienteState {
    clienteSeleccionado: Cliente | null;
    isModalOpen: boolean;

    openModal: (cliente?: Cliente) => void;
    closeModal: () => void;
};


export const useClienteStore = create<ClienteState>((set) => ({
    clienteSeleccionado: null,
    isModalOpen: false,

    openModal: (cliente) => set({
        clienteSeleccionado: cliente,
        isModalOpen: true
    }),
    closeModal: () => set({
        clienteSeleccionado: null,
        isModalOpen: false
    })
}))