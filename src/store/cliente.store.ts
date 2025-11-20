import { create } from "zustand";
import type { Cliente } from "../interface/Cliente";

interface ClienteState {
    clienteSeleccionado: Cliente | null;
    isModalOpen: boolean;

    filtro: string | null,
    setFiltro: (filtro: string | null) => void,

    openModal: (cliente?: Cliente) => void;
    closeModal: () => void;
};


export const useClienteStore = create<ClienteState>((set) => ({
    clienteSeleccionado: null,
    isModalOpen: false,

    filtro: '',
    setFiltro: (filtro) => set({ filtro }),

    openModal: (cliente) => set({
        clienteSeleccionado: cliente,
        isModalOpen: true
    }),
    closeModal: () => set({
        clienteSeleccionado: null,
        isModalOpen: false
    })
}))