import { create } from "zustand";
import type { Usuario } from "../interface/Usuario";

interface UsuarioState {
    usuarioSeleccionado: Usuario | null;
    isModalOpen: boolean;

    openModal: (usuario?: Usuario) => void;
    closeModal: () => void;
};

export const useUsuarioStore = create<UsuarioState>((set) => ({
    usuarioSeleccionado: null,
    isModalOpen: false,

    openModal: (usuario) => set({
        usuarioSeleccionado: usuario,
        isModalOpen: true
    }),
    closeModal: () => set({
        usuarioSeleccionado: null,
        isModalOpen: false
    })
}))