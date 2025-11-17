import { create } from "zustand";
import type { TipoEgreso } from "../interface/TipoEgreso";



interface TipoEgresoState {
    tipoEgresoSeleccionado: TipoEgreso | null;
    isModalOpen: boolean;

    openModal: (tipoEgreso?: TipoEgreso) => void;
    closeModal: () => void;
}

export const useTipoEgresoStore = create<TipoEgresoState>((set) => ({
    tipoEgresoSeleccionado: null,
    isModalOpen: false,

    openModal: (tipoEgreso) => set({
        tipoEgresoSeleccionado: tipoEgreso,
        isModalOpen: true
    }),
    closeModal: () => set({
        tipoEgresoSeleccionado: null,
        isModalOpen: false
    })
}));
